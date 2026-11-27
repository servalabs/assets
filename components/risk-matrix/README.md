# RiskMatrix Integration Notes

`RiskMatrix` is a shared React component consumed by `web/website-current`
through the `@assets` Vite alias. Because it lives outside the app package,
its bare imports for `react`, `react-dom`, `framer-motion`, and `lucide-react`
must resolve to the website app's own dependency graph.

The required Vite setting lives in `web/website-current/vite.config.ts`:

```ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "@assets": path.resolve(__dirname, "../../assets"),
  },
  dedupe: ["react", "react-dom", "framer-motion", "lucide-react"],
}
```

Do not remove the `dedupe` list when moving the component or changing package
managers. Without it, Vite can resolve a second React instance for files under
`assets/components/risk-matrix`, which breaks hooks at runtime.

Verification used for the website integration:

- `npm run test -- src/pages/new/NetWall.test.tsx src/pages/new/SolutionsDefense.test.tsx src/pages/new/SolutionsEnterprise.test.tsx src/pages/new/SolutionsIntelligence.test.tsx src/pages/new/Newsroom.test.tsx src/pages/InvestPage.test.tsx src/pages/Index.test.tsx src/pages/new/Solutions.test.tsx src/pages/new/SolutionsLawEnforcement.test.tsx`
- `npm run build`
- Inspect `dist/assets/index-*.js` after build: React is bundled once through the app entry, and no separate RiskMatrix-owned React chunk is emitted.

## Optional props (opt-in; omitting them keeps the original behaviour)

- `scrollChain?: string[]` — ordered entity keys (`google`, `meta`, … `fbi`).
  The panel opens on the first one and shows Previous/Next controls plus a
  "Next: X" button at the end of each history. On the side-by-side desktop
  layout with a fine pointer, a fresh downward wheel flick at the end of a
  history moves to the next entity (never backwards, never the flick that
  merely reached the end, and never at the last entity — the page scrolls on).
  servalabs.com uses an India-first order; the WinCommander app passes none.
- `featuredAudience?: string` / `featuredAudienceLabel?: string` — events whose
  `audiences` (set in `exposures.ts`) include this code float to the top of
  each history with the label as a badge (servalabs.com: `"IN"`,
  "Relevant in India").
- `sortEvents?: (events) => events` — custom display order for each history
  (overrides the featured float; the featured badge stays). servalabs.com:
  pinned, then CRITICAL → HIGH → UNKNOWN, then rank, then India-relevant.
- `techOrder?: string[]` — order of the orbiting ring (default `TECH_ORDER`);
  agencies always stay in the centre.
- `highlightMoney?: boolean` — marks currency amounts ($, US$, €, £, ₹ with
  optional million/billion/crore/lakh/bn/m/k) in headlines and explanations
  and adds a "Money" chip. The helpers are exported for host variants:
  `MONEY_RE`, `splitMoney`, `findMoney`, `hasMoney`, `<MoneyText>`.
- Event-card theme vars (all optional; unset = original look):
  `--rm-event-bg`, `--rm-event-border`, `--rm-event-shadow`,
  `--rm-event-featured-bg`, `--rm-event-featured-border`, plus
  `--rm-money-bg` / `--rm-money-fg` for the money highlight.

Layout notes: below 1024px the panel is capped at `min(38rem, 78svh)` and
scrolls inside; the orbit scales down via container queries so every node
stays inside narrow cards; touch/narrow layouts get 40px hit areas.
