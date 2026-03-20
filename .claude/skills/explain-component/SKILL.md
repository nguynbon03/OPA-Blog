---
name: explain-component
description: "Explains how any component, hook, pattern, or feature works in the Blog OPA frontend. Provides dual-layer explanations: simple analogy + technical detail. Use when user asks 'explain X', 'what does X do?', or wants to understand any part of the codebase."
user_invocable: true
---

# Explain Component — Clear Explanations

Explain frontend code with dual-layer approach.

---

## Explanation Protocol

### Layer 1: Simple (analogy)

One sentence explaining what it does in plain language.

```
Example: "PostCard is like a book cover in a library — it shows the title,
a preview image, and just enough info to decide if you want to read more."
```

### Layer 2: Technical

```
COMPONENT: [Name]
TYPE:      Server | Client
FILE:      src/components/[path]

PROPS:
  name     type          required   description
  ─────────────────────────────────────────────
  title    string        yes        Post title
  slug     string        yes        URL slug
  ...

RENDERS:
  [ASCII tree of what this component outputs]

DEPENDENCIES:
  - framer-motion (fadeUp animation)
  - shadcn Badge (category label)
  - next/image (cover image)

PATTERNS USED:
  - Glass card (backdrop blur)
  - Hover scale animation
  - Line clamp for text truncation

STATE / EFFECTS:
  - None (stateless) | useState for X | useEffect for Y
```

### Verify

```
[V] Explanation accuracy: 0.XX
    Read actual source: YES
    Matches current code: YES/NO
```

---

## Output Rules

- Lead with Layer 1 (one sentence).
- Follow with Layer 2 (structured table).
- Include ASCII render tree if component has children.
- No emojis. Concise.
