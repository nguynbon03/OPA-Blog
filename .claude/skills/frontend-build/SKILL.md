---
name: frontend-build
description: "Structured component/page building for Next.js 15 + Tailwind + shadcn/ui projects. Applies complex-problem reasoning (DECOMPOSE > SOLVE > VERIFY > SYNTHESIZE > REFLECT) and PERT time estimates. Use when user says 'build X', 'create component', 'implement page', 'add feature', or any construction task."
user_invocable: true
---

# Frontend Build — Structured Implementation

Build components, pages, and features using the complex-problem reasoning framework.

---

## Protocol

For EVERY build task, follow this exact sequence:

### Step 1: DECOMPOSE [D]

Break the request into atomic sub-problems:

```
[D] Decomposition:
  1. Component structure (what renders what)
  2. Data requirements (props, server data, client state)
  3. Styling approach (Tailwind classes, glass effects, animations)
  4. Interactivity (client vs server, event handlers)
  5. Integration points (API routes, DB queries, navigation)
```

### Step 2: SOLVE [S] with confidence

For each sub-problem, provide solution + confidence:

```
[S] Component structure (confidence: 0.95):
  - ServerComponent wraps ClientInteractive
  - Uses shadcn Card + Badge
  ...

[S] Styling (confidence: 0.90):
  - glass rounded-2xl for cards
  - fadeUp animation on scroll
  ...
```

### Step 3: VERIFY [V]

Cross-check against:
- [ ] Matches project design tokens (see CLAUDE.md)
- [ ] Uses existing patterns (glass, text-gradient, bg-hero)
- [ ] Reuses existing components (check src/components/ui/)
- [ ] Follows Next.js 15 patterns (server vs client components)
- [ ] Accessible (aria labels, keyboard nav, contrast)
- [ ] Responsive (mobile-first, md: breakpoints)
- [ ] No security issues (XSS via dangerouslySetInnerHTML, etc.)

```
[V] Verification:
  - Design tokens: PASS
  - Pattern reuse: PASS (using glass, fadeUp)
  - Accessibility: WARN — need aria-label on icon buttons
  ...
```

### Step 4: SYNTHESIZE [SY]

Combine into implementation. Output:
1. File path
2. Complete code
3. What to verify after implementation

### Step 5: REFLECT [R]

```
[R] Reflection (overall: 0.XX):
  - If >= 0.80: proceed with implementation
  - If < 0.80: identify weak points, retry once
```

---

## Execution Time Estimate (mandatory for plans)

```
### Execution Time Estimate
- Per-step: O=?, M=?, P=?, E=(O+4M+P)/6
- Total: O_total, M_total, P_total, E_total
- Assumptions + Risks that push to P
- Confidence: 0.00-1.00
```

---

## Design System Reference

```
Colors:
  BG:        #0a0b0d     Surface:  #0f1117
  Card:      glass class  Accent:  #155eef
  Text:      #f8fafc     Muted:    #94a3b8

Components:
  Glass card:      className="glass rounded-2xl p-8"
  Gradient text:   className="text-gradient"
  Hero glow:       className="bg-hero"
  Icon container:  className="rounded-xl bg-[#155eef]/10 p-3"

Animations (from src/lib/motion.ts):
  fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight, staggerContainer

Fonts:
  Body:    font-[family-name:var(--font-sans)]
  Heading: font-[family-name:var(--font-heading)]
```

---

## Safety Tags

```
[R:LOW]    — Local file changes, reversible
[R:MEDIUM] — API routes, DB schema changes
[R:HIGH]   — Auth logic, payment, data deletion
```

---

## Output Rules

- Concise. No preamble. Lead with the code.
- Chunked for ADHD readability.
- No emojis.
- Self-review before presenting.
- Include verification command after implementation:
  ```bash
  npx tsc --noEmit && npm run lint
  ```
