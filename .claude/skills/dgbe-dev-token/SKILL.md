---
name: dgbe-dev-token
description: Use DataGlass static bypass bearer tokens when calling dgbe directly. Local development at http://localhost:8080 accepts "a". Production at https://prod-api.dataglasslabs.com uses the rotated SECURITY_DEV_TOKEN from the gitignored dgbe terraform.tfvars or /opt/dgbe/.env on dgbe-azure. Do not print production tokens.
---

# dgbe Dev Bearer Tokens

When testing dgbe endpoints directly (bypassing the FE auth flow), local development accepts the literal token **`a`** as a static bearer token. Static bypass tokens are not impersonation tokens: they resolve to the bypass identity (`user_id=1`). For any request that needs another user, call `POST /auth/internal/impersonate/{userId}` with the static token first, then use the returned JWT for the real API call.

Production has a separate static bypass token. It was rotated on 2026-05-14 and is stored in:

- Local source of truth: `/Users/bsoonjun/Documents/GitHub/dataglass/dgbe/terraform/azure/terraform.tfvars`
- Live Azure VM source: `/opt/dgbe/.env` on `dgbe-azure`

Do not use `Bearer a` against production. It should return `401`. Do not print the production token in answers or logs; load it into a shell variable at call time.

## When to use

- Sanity-checking an API response shape outside the running FE.
- Verifying a backend change you just made (e.g. "did the new field land?").
- Reproducing a behavior the FE saw, with full control over body/params.
- Smoke-testing endpoints before pasting them into the orval-generated client.

## How to call

### Local curl

For the bypass identity (`user_id=1`), call local dgbe directly:

```bash
curl -sS -X POST 'http://localhost:8080/api/canonical-product-controller/canonical/search-products?user_id=1' \
  -H 'Authorization: Bearer a' \
  -H 'Content-Type: application/json' \
  -d '{"query":"6-FC","platform":"SHOPEE","platformShopId":"398299104"}' | jq .
```

```bash
curl -sS 'http://localhost:8080/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=1&threshold=0.5&limit=10' \
  -H 'Authorization: Bearer a' | jq .
```

For any other user, impersonate first:

```bash
TARGET_USER_ID=2
DGBE_USER_TOKEN=$(
  curl -sS -X POST "http://localhost:8080/auth/internal/impersonate/${TARGET_USER_ID}" \
    -H 'Authorization: Bearer a' \
    -H 'Accept: application/json' | jq -r '.data.accessToken'
)

curl -sS "http://localhost:8080/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=${TARGET_USER_ID}&threshold=0.5&limit=10" \
  -H "Authorization: Bearer ${DGBE_USER_TOKEN}" | jq .
unset DGBE_USER_TOKEN TARGET_USER_ID
```

### Production curl

Never call a user-scoped prod endpoint with the prod dev token and an arbitrary `userId` / `user_id`. Use the prod dev token only to mint an impersonated JWT, then call the target endpoint with that JWT:

```bash
TARGET_USER_ID=2
DGBE_PROD_DEV_TOKEN=$(
  perl -ne 'if (/^\s*SECURITY_DEV_TOKEN\s*=\s*"([^"]*)"/) { print $1; exit }' \
    /Users/bsoonjun/Documents/GitHub/dataglass/dgbe/terraform/azure/terraform.tfvars
)

DGBE_USER_TOKEN=$(
  curl -sS -X POST "https://prod-api.dataglasslabs.com/auth/internal/impersonate/${TARGET_USER_ID}" \
    -H "Authorization: Bearer ${DGBE_PROD_DEV_TOKEN}" \
    -H 'Accept: application/json' | jq -r '.data.accessToken'
)

curl -sS "https://prod-api.dataglasslabs.com/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=${TARGET_USER_ID}&threshold=0.5&limit=10" \
  -H "Authorization: Bearer ${DGBE_USER_TOKEN}" | jq .
unset DGBE_PROD_DEV_TOKEN DGBE_USER_TOKEN TARGET_USER_ID
```

Direct prod calls like this are expected to fail for non-`1` users:

```bash
curl -sS -X POST 'https://prod-api.dataglasslabs.com/api/some-user-scoped-endpoint?userId=2' \
  -H 'Authorization: Bearer <prod dev token>' \
  -H 'Content-Type: application/json' | jq .
```

### Production curl through Cloudflare Access

Public prod internal routes such as `/auth/internal/**` may return Cloudflare
`302 Found` HTML before the request reaches dgbe. Authenticate the Cloudflare
Access application first, then send the prod dev token with the request:

```bash
TARGET_USER_ID=2
cloudflared access login "https://prod-api.dataglasslabs.com/auth/internal/impersonate/${TARGET_USER_ID}"

DGBE_PROD_DEV_TOKEN=$(
  perl -ne 'if (/^\s*SECURITY_DEV_TOKEN\s*=\s*"([^"]*)"/) { print $1; exit }' \
    /Users/bsoonjun/Documents/GitHub/dataglass/dgbe/terraform/azure/terraform.tfvars
)

DGBE_USER_TOKEN=$(
  cloudflared access curl "https://prod-api.dataglasslabs.com/auth/internal/impersonate/${TARGET_USER_ID}" \
    -X POST \
    -H "Authorization: Bearer ${DGBE_PROD_DEV_TOKEN}" \
    -H 'Accept: application/json' | jq -r '.data.accessToken'
)

curl -sS "https://prod-api.dataglasslabs.com/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=${TARGET_USER_ID}&threshold=0.5&limit=10" \
  -H "Authorization: Bearer ${DGBE_USER_TOKEN}" | jq .
unset DGBE_PROD_DEV_TOKEN DGBE_USER_TOKEN TARGET_USER_ID
```

### Browser fetch (Playwright `browser_evaluate`, local only)

```js
async () => {
  const res = await fetch('http://localhost:8080/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=1', {
    headers: { Authorization: 'Bearer a' },
  });
  return { status: res.status, body: await res.json() };
}
```

## Pre-flight checks

Before relying on the token, confirm dgbe is up:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://localhost:8080/v3/api-docs
```

Expect `200`. If `000` / refused, the BE isn't running — start it before running test calls.

## Important constraints

- **The static token is not impersonation.** It resolves as `user_id=1`. If the payload/query/path names another user, use `/auth/internal/impersonate/{userId}` first.
- **`user_id` must match the bearer.** User-scoped endpoints should reject a request where the token user and payload/query/path user differ.
- **Dev only.** `Bearer a` is rejected by any non-dev profile. Never use this token, hardcode it, or commit it for staging/prod.
- **Prod dev token is only an entry token.** Use it for `/auth/internal/impersonate/{userId}`, then discard it and use the returned JWT for the target request.
- **The FE doesn't use it.** The FE has its own session token via the auth flow. Don't paste `Bearer a` into FE code.
- **No write-side magic.** The token gets you past the auth filter; downstream business validations (e.g. shop ownership, merge ledger) still run.
- The orval-generated `customFetch` already attaches the FE's real bearer when running through the FE — for FE-to-BE testing, prefer the FE proxy at `http://localhost:3000/api/...` with `credentials: 'include'`. Only reach for `Bearer a` when you're testing the BE in isolation.

## Common diagnostic recipes

**Did my schema change land?**
```bash
curl -sS http://localhost:8080/v3/api-docs | jq '.paths["/api/canonical-product-controller/canonical/search-products"].post.requestBody.content."application/json".schema.$ref'
```

**Are match-suggestions populated for canonical X?**
```bash
curl -sS 'http://localhost:8080/api/canonical-product-controller/canonical/1305/match-suggestions?user_id=1' \
  -H 'Authorization: Bearer a' | jq '.data | length'
```

**What does the canonical paginated body need?**
```bash
curl -sS -X POST 'http://localhost:8080/api/canonical-product-controller/canonical/fetch-products-with-platforms-paginated?user_id=1' \
  -H 'Authorization: Bearer a' -H 'Content-Type: application/json' \
  -d '{"pageSize":5,"platform":"SHOPEE","platformShopId":"398299104"}' | jq '.data.size, (.data.data | length)'
```
