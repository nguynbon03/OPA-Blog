---
name: debug-frontend
description: "Systematic debugging for Next.js 15 frontend issues. Traces render errors, hydration mismatches, styling bugs, API failures, and build errors. Use when user says 'X is broken', 'why is X not rendering?', 'error', 'bug', or describes any malfunction."
user_invocable: true
---

# Debug Frontend — Systematic Issue Tracing

Debug frontend issues using structured reasoning.

---

## Debug Protocol

### Step 1: DECOMPOSE the symptom [D]

```
[D] Symptom: [what user reported]
    Category: [render | hydration | style | API | build | runtime]
    Scope: [component | page | global]
    Reproducible: [always | sometimes | unknown]
```

### Step 2: Hypothesis generation [S]

List 3-5 probable causes, ranked by likelihood:

```
[S] Hypotheses (most likely first):
  H1 (0.70): Missing "use client" directive on component using hooks
  H2 (0.50): Hydration mismatch from Date rendering
  H3 (0.30): Tailwind class not compiled (missing in content paths)
  ...
```

### Step 3: Evidence collection [V]

For each hypothesis, define what to check:

```
[V] Testing H1:
  - Read the component file → check for "use client"
  - Check if it uses useState/useEffect/event handlers
  - Result: CONFIRMED / REJECTED
```

### Step 4: Root cause + fix [SY]

```
[SY] Root cause: H1 confirmed — [component] uses useState but missing "use client"
     Fix: Add "use client" directive at top of file
     Side effects: None — component has no server-only imports
```

### Step 5: REFLECT [R]

```
[R] Confidence: 0.XX
  - Fix addresses root cause: YES/NO
  - Could mask another issue: YES/NO
  - If < 0.80: investigate further before applying fix
```

---

## Common Next.js 15 Issues Checklist

```
[ ] "use client" missing on components with hooks/events
[ ] Hydration mismatch (Date, Math.random, window access in SSR)
[ ] Server component importing client-only library
[ ] Missing Suspense boundary around async component
[ ] next/image without width/height or fill
[ ] API route not exporting named HTTP method (GET, POST)
[ ] MongoDB connection in client component (must be server-only)
[ ] Framer Motion on server component (needs "use client")
[ ] shadcn component not installed (npx shadcn add [name])
[ ] Tailwind class not working (check globals.css imports)
```

---

## Safety

```
[R:LOW]    — UI/style bug
[R:MEDIUM] — Data rendering bug, API error
[R:HIGH]   — Auth bypass, data leak, crash in production
```
