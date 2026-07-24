#!/usr/bin/env bash
# PostToolUse(Write|Edit) hook: when feature code under dg-app/layers changes,
# remind to update the dg-docs documentation. Always exits 0 (never blocks).
f="$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)"
case "$f" in
  *dg-app/layers/*.vue|*dg-app/layers/*.ts)
    printf '%s' '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"📝 dg-app/layers feature code changed. If this ADDS, EXTENDS, or CHANGES user-facing behaviour, update the matching page in dg-docs (and its Thai twin under content/docs-th). Invoke the dg-docs skill for the conventions."}}'
    ;;
esac
exit 0
