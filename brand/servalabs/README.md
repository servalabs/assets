# ServaLabs brand mark

Impossible-object (Penrose triangle) mark — sovereignty and self-containment,
a loop that closes only from one viewpoint. Palette follows the sovereign
theme: warm off-white surfaces, near-black ink, and readable teal signal.

| File | Use |
| --- | --- |
| `servalabs-mark.svg` | Mark for **dark** surfaces (light ink) |
| `servalabs-mark-light.svg` | Mark for **light** surfaces (dark ink) |
| `favicon.svg` | Browser favicon — backed mark with auto light/dark via `prefers-color-scheme` |
| `gen-logo.mjs` | Deterministic generator/checker for the three SVGs above |

This folder is the single source of truth for the mark. The website nav renders
it inline (`website-current/src/components/BrandMark.tsx`) so its tone follows
`currentColor`; don't fork the geometry — update it here.

## Regenerate

```powershell
node brand\servalabs\gen-logo.mjs --check
node brand\servalabs\gen-logo.mjs
```

The script keeps the six Penrose polygon point-sets in one place and applies the
variant palettes for dark surfaces, light surfaces, and the adaptive favicon.
