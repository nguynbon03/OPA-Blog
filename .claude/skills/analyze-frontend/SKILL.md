---
name: analyze-frontend
description: "Deep-dive analysis of Next.js frontend codebase. Maps component trees, data flow, rendering strategies, and module relationships. Use when user asks 'how does X work?', 'how are X and Y connected?', architecture questions, or needs codebase understanding."
user_invocable: true
---

# Analyze Frontend — Codebase Deep-Dive

Analyze frontend architecture using structured reasoning.

---

## Analysis Protocol

### Step 1: Scope [D]

```
[D] Analysis target: [component | page | feature | full architecture]
    Depth: [surface | medium | deep]
    Output: [diagram | explanation | both]
```

### Step 2: Trace [S]

For the target, trace:

```
COMPONENT TREE
──────────────
RootLayout
  ├── Navbar (client) — sticky glass, scroll detection
  ├── [page content]
  │   ├── Hero (client) — framer-motion animations
  │   ├── Features (client) — stagger grid
  │   └── ...
  └── Footer (server) — static links
```

```
DATA FLOW
─────────
Client Request → Next.js Route → Server Component
  → connectDB() → Mongoose Query → Response
  → Client Component receives props → Renders with animations
```

```
RENDERING STRATEGY
──────────────────
Page          | Type    | Data Source      | Caching
─────────────────────────────────────────────────────
/             | Static  | None (hardcoded) | ISR
/blog         | Dynamic | MongoDB query    | No cache
/blog/[slug]  | SSG     | generateStaticParams | Revalidate
/admin/*      | Dynamic | Session + DB     | No cache
/api/*        | Dynamic | Request body     | No cache
```

### Step 3: Verify [V]

```
[V] Cross-check:
  - All imports resolve: YES/NO
  - No circular dependencies: YES/NO
  - Server/client boundary correct: YES/NO
  - Design token compliance: YES/NO
```

### Step 4: Synthesize [SY]

Produce ASCII diagram + key findings.

### Step 5: Reflect [R]

```
[R] Analysis confidence: 0.XX
    Areas needing deeper investigation: [list]
```

---

## Output Format

Always include:
1. ASCII component tree or data flow diagram
2. Key findings (bulleted, scannable)
3. Confidence score
