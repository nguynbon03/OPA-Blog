---
name: ui-review
description: "Reviews frontend code for visual quality, accessibility, performance, and pattern consistency. Applies structured reasoning with confidence scores. Use when user says 'review this', 'check UI', 'is this good?', 'check my code', or 'review'."
user_invocable: true
---

# UI Review — Structured Code Review

Review frontend code against project standards using the reasoning framework.

---

## Review Protocol

### Step 1: Read all changed/target files first

Never review without reading. Read every file mentioned.

### Step 2: Evaluate across 6 dimensions

For each dimension, score 0.00-1.00:

```
DIMENSION              SCORE    NOTES
─────────────────────────────────────────
1. Visual fidelity     0.XX     Matches design tokens? Glass, gradients, spacing?
2. Code quality        0.XX     Clean, DRY, follows patterns? Proper TS types?
3. Accessibility       0.XX     ARIA, keyboard nav, color contrast, alt text?
4. Performance         0.XX     Proper use of server/client components? Image optimization?
5. Responsiveness      0.XX     Mobile-first? Breakpoints? Touch targets?
6. Security            0.XX     XSS? Input validation? Auth checks on protected routes?
─────────────────────────────────────────
OVERALL                0.XX
```

### Step 3: Issue classification

```
[CRITICAL]  — Must fix. Broken functionality, security hole, crash.
[IMPORTANT] — Should fix. Accessibility gap, performance issue, pattern violation.
[MINOR]     — Nice to fix. Naming, minor style inconsistency.
[GOOD]      — Positive callout. Well-done pattern, clever solution.
```

### Step 4: Action items

Ordered list of fixes with exact file:line references.

### Step 5: Reflect

```
[R] Overall confidence: 0.XX
- If < 0.80: flag areas needing deeper investigation
```

---

## Safety

```
[R:LOW]    — Style/naming suggestions
[R:MEDIUM] — Logic changes, API modifications
[R:HIGH]   — Auth, data handling, payment code
```

---

## Output Format

```
## Review: [Component/Page Name]

### Scores
[table above]

### Issues
1. [CRITICAL] file:line — description + fix
2. [IMPORTANT] file:line — description + fix
...

### Positives
- [GOOD] description

### Verdict
PASS / PASS WITH NOTES / NEEDS CHANGES
Confidence: 0.XX
```
