---
name: dense-interface-design
description: Review and improve source code for information-dense interfaces by maximizing useful value per unit of space and time without sacrificing clarity, accessibility, or perceived performance. Use for dashboards, admin tools, data tables, search, analytics, editors, command centers, and expert workflows.
---

# Dense Interface Design

## Goal

Produce interfaces that deliver more **useful value per unit of space and time**.

Density is not the number of elements on screen. A dense interface helps users perceive, understand, compare, and act on relevant information quickly. Never optimize for compactness alone.

Use this skill when implementing or reviewing frontend source code for dashboards, tables, forms, search results, monitoring tools, editors, analytics, or other information-rich products.

## Core model

Evaluate density as:

```text
useful density = task-relevant value / (space consumed × time required)
```

This is a reasoning model, not a literal production metric. Improve the numerator before shrinking the denominator.

A change is successful only when it improves at least one of these without materially harming the others:

- Information visible at the moment it is needed
- Time to locate, interpret, compare, or act
- Accuracy and confidence
- Visual clarity and scanability
- Accessibility and input comfort
- Perceived responsiveness

## Operating principles

### 1. Remove low-value information before reducing spacing

Do not begin by shrinking fonts, padding, controls, or hit targets.

First:

1. Identify the user's primary decisions and actions.
2. Remove duplicated labels, decorative chrome, repeated metadata, and low-value prose.
3. Collapse secondary details behind contextual disclosure.
4. Keep frequently compared values visible together.
5. Only then tune spacing and sizing.

Prefer fewer meaningful elements over many compressed elements.

### 2. Optimize the whole task, not a screenshot

A visually sparse screen can be temporally inefficient when it forces extra navigation, scrolling, hovering, opening, or remembering.

Count interaction costs such as:

- Page transitions
- Modal openings
- Accordion expansion
- Hover-dependent discovery
- Horizontal or vertical scrolling
- Repeated filtering and sorting
- Switching between views to compare values
- Waiting for content or layout shifts

Keep information together when users routinely compare it.

### 3. Create strong perceptual structure

Use Gestalt grouping deliberately. Relationships should be visible before they are read.

Prefer, in order:

1. Spatial proximity
2. Alignment
3. Shared container or background
4. Typography and weight
5. Borders and divider lines

Avoid drawing a box or divider around every item. Excess chrome lowers the signal-to-noise ratio.

In code, favor layout primitives and tokens over one-off visual separators.

### 4. Use hierarchy to make density readable

Dense interfaces need stronger hierarchy, not more decoration.

Ensure:

- One dominant reading order
- Clear section boundaries
- Stable column alignment
- Consistent number formatting
- Distinct primary and secondary text
- Predictable action placement
- Labels close to the values they describe
- Repeated patterns that can be learned once

Use whitespace as punctuation: small gaps within groups, larger gaps between groups.

### 5. Preserve context through progressive disclosure

Progressive disclosure is useful only when it hides secondary information rather than information needed for the current decision.

Good candidates to hide:

- Rare actions
- Long explanations
- Audit history
- Advanced settings
- Full identifiers when a short form is sufficient
- Details used after selection, not during comparison

Keep visible:

- State and status
- Values users compare
- Primary actions
- Constraints and validation
- Consequences of an action
- Information needed to distinguish similar items

Do not make essential information hover-only. Hover is unavailable or unreliable on touch devices and is poor for accessibility.

### 6. Design for frequency and expertise

Support both discovery and repeated use.

For common actions:

- Keep them directly available
- Provide keyboard support where appropriate
- Preserve filters, sort order, and view state
- Avoid confirmation steps for easily reversible actions
- Offer bulk operations for repeated item-level work

For rare or destructive actions:

- Separate them visually
- Make consequences explicit
- Require confirmation when reversal is difficult

Do not create a separate "expert mode" unless the product genuinely has distinct audiences. Prefer an interface that becomes faster as users learn it.

### 7. Treat perceived performance as density

Waiting consumes time and reduces useful density.

When reviewing source code, check for:

- Immediate response to input
- Stable layout during loading
- Skeletons that match final geometry
- Optimistic updates for safe, reversible operations
- Incremental rendering of useful content
- Cached or preserved navigation state
- Debounced expensive queries without sluggish feedback
- Virtualization only when data size requires it

Do not use spinners when the interface can preserve prior content or show meaningful partial results.

### 8. Keep interaction targets accessible

Visual compactness must not produce unusable controls.

Maintain:

- Adequate pointer and touch targets
- Visible keyboard focus
- Logical tab order
- Semantic HTML
- Programmatic labels
- Sufficient contrast
- Zoom and text-resizing support
- Reduced-motion support where animation is used

A small icon may sit inside a larger invisible hit area. Separate visual size from interaction size.

## Source-code workflow

### Step 1: Establish the task model

Before editing code, state:

- Primary user task
- Information needed to complete it
- Most frequent comparisons
- Most frequent actions
- Secondary details
- Current sources of wasted space or time

When these are unknown, infer them from routes, component names, analytics hooks, tests, copy, and data models. Mark uncertain assumptions.

### Step 2: Audit the current implementation

Inspect:

- Component hierarchy
- DOM order and semantics
- CSS layout and spacing
- Typography tokens
- Data fetching and loading states
- Interaction count for core tasks
- Responsive behavior
- Keyboard behavior
- Empty, error, and partial states

Create a compact audit table:

| Issue | Space cost | Time cost | Clarity cost | Proposed change |
|---|---:|---:|---:|---|

Use qualitative ratings such as low, medium, and high when measurements are unavailable.

### Step 3: Prioritize changes

Apply changes in this order:

1. Remove irrelevant or duplicate content
2. Reorganize information around user decisions
3. Improve grouping and hierarchy
4. Reduce interaction and waiting costs
5. Add high-value information currently hidden elsewhere
6. Tune spacing and typography
7. Add shortcuts and expert accelerators

Do not begin with a global `font-size`, `gap`, or `padding` reduction.

### Step 4: Implement with reusable primitives

Prefer reusable components and design tokens such as:

- `Stack` or `Cluster` for consistent grouping
- `DataRow` for aligned label/value pairs
- `Metric` for comparable values
- `StatusBadge` with text and non-color cues
- `Toolbar` with primary and overflow actions
- `Disclosure` for secondary content
- `DataTable` with stable alignment and responsive priorities
- Density tokens such as `comfortable`, `compact`, and `dense`

If density modes are supported, keep semantic hierarchy and target sizes stable. Modes should mainly adjust spacing, row height, and optional secondary content.

### Step 5: Verify with task-based checks

Test the interface using representative tasks, not visual preference alone.

Measure or estimate:

- Time to find a target value
- Number of interactions to complete a common action
- Number of visible comparable items
- Error rate or ambiguity
- Layout stability while loading
- Keyboard completion path
- Behavior at narrow widths and 200% zoom

Compare before and after. Reject changes that merely fit more pixels while increasing interpretation or interaction time.

## Code-review checklist

### Information

- Is every visible element relevant to the current task?
- Are frequently compared values visible simultaneously?
- Is important state duplicated, hidden, or separated from its object?
- Can secondary detail be disclosed contextually?

### Layout and hierarchy

- Do proximity and alignment communicate relationships?
- Are spacing differences systematic rather than arbitrary?
- Are numbers, dates, and units aligned and formatted consistently?
- Are borders being used where spacing or alignment would work better?

### Interaction

- Can common actions be completed without unnecessary navigation?
- Are primary actions visible and rare actions placed in overflow?
- Does the interface preserve user context and state?
- Are bulk actions available for repetitive work?

### Performance

- Does input receive immediate visible acknowledgment?
- Is useful content shown incrementally?
- Does loading preserve layout and context?
- Are expensive renders, requests, and layout shifts controlled?

### Accessibility

- Are semantics, labels, focus, and reading order correct?
- Are targets usable despite compact visuals?
- Is information conveyed without relying only on color or hover?
- Does the layout survive zoom, text resizing, and narrow viewports?

## Implementation patterns

### Dense table rows

Use fixed alignment for scanability and allow lower-priority columns to collapse responsively.

```tsx
<tr>
  <th scope="row">
    <a href={item.href}>{item.name}</a>
    <span className="secondary">{item.description}</span>
  </th>
  <td className="numeric">{formatNumber(item.value)}</td>
  <td><StatusBadge status={item.status} /></td>
  <td className="rowActions"><RowActions item={item} /></td>
</tr>
```

Avoid repeating labels inside every desktop row. Restore labels in stacked mobile layouts when column headers are no longer spatially available.

### Compact controls with safe targets

```css
.iconButton {
  inline-size: 2.5rem;
  block-size: 2.5rem;
  display: inline-grid;
  place-items: center;
}

.iconButton > svg {
  inline-size: 1rem;
  block-size: 1rem;
}
```

The icon remains visually compact while the target remains usable.

### Spacing as grouping

```css
.section {
  display: grid;
  gap: var(--space-6);
}

.fieldGroup {
  display: grid;
  gap: var(--space-2);
}
```

The larger inter-section gap and smaller intra-group gap communicate structure without extra borders.

### Responsive priority

```css
@media (max-width: 48rem) {
  .priorityLow {
    display: none;
  }
}
```

Only hide information confirmed to be secondary. Provide access through a details view when it may still be needed.

## Anti-patterns

Reject or revise changes that:

- Shrink all spacing without a task analysis
- Use tiny type to increase visible row count
- Replace text labels with ambiguous icons
- Put essential content only in tooltips
- Hide frequently compared values behind clicks
- Add cards and containers around every element
- Use color as the only status signal
- Introduce horizontal scrolling for core comparisons without justification
- Virtualize small lists and add complexity without benefit
- Show blank screens or blocking spinners during refetches
- Add a density toggle instead of fixing poor information architecture
- Optimize only for desktop screenshots

## Output format

When this skill is used to review source code, return:

1. **Task model** — inferred user goals and key information
2. **Density findings** — issues ranked by user impact
3. **Code changes** — focused patches or implementation guidance
4. **Verification** — task, accessibility, responsive, and performance checks
5. **Tradeoffs** — information intentionally hidden, deferred, or made more prominent

When editing code directly, keep changes scoped and preserve the project's existing conventions unless those conventions cause the identified problem.

## Definition of done

The result is done when:

- Users can complete primary tasks with fewer or equal interactions
- More relevant information is visible or easier to retrieve
- Grouping and hierarchy remain clear at a glance
- Loading and interaction feel immediate and stable
- Keyboard and assistive-technology paths remain functional
- Compactness does not depend on tiny text or targets
- Responsive layouts preserve the highest-value information
- The code uses maintainable primitives rather than local compression hacks
