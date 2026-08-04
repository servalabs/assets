# AGENTS.md — servalabs-assets

Agent + contributor entry point for the shared-assets repo. Read the global
standards at [BESTPRACTICES.md](BESTPRACTICES.md) — a synced local copy (works
without the `obsidian-vault` repo present) — before editing. Canonical source:
`D:\GitHub\obsidian-vault\10 System\GitHub\BESTPRACTICES.md`; edit there, then
re-sync this copy.

## What this repo is

The single source of truth for cross-product **shared assets**: raw media
(logos, icons, screenshots, fonts), public legal documents, and a few shared
React components. It is consumed as a **git submodule** by `servalabs.com`
(at `assets/`) and `wincommander` (at `assets/`). One asset, one place.

## Docs index

- [README.md](README.md) — taxonomy, consumption, shared components.
- `components/risk-matrix/SOURCES.md` — citation ledger for the Risk Matrix.

## Conventions

- **Additive by folder.** Put a file in the correct taxonomy folder (see README);
  don't invent parallel structures. Marketing collateral → `marketing/`; raw
  functional assets stay in `apps|components|editorial|entities|softwares|fonts`;
  product screenshots/demo media → `products/<product>/`.
- After a change here, bump the submodule pointer in every consuming repo
  (`git submodule update --remote`) — a change is not "live" for consumers until
  they advance the pointer.
- **Weaknesses ledger:** record any weakness you find in [WEAKNESSES.md](WEAKNESSES.md) on every run.

## Gotchas

- **`entities/` and `editorial/` are import dependencies of `components/risk-matrix`**
  (relative imports `../../entities/…`, `../../editorial/…`). Keep the imports and
  consumer references synchronized if either path changes.
- **`components/risk-matrix/` is source code**, not static media. It carries a
  `--rm-*` CSS-variable theme contract and needs React 19 / framer-motion 12 /
  lucide-react 1 + a Vite build (with `resolve.dedupe` in an outside-the-app-dir
  monorepo like servalabs.com).
- **Legal SSOT lives here.** `legal/EULA.md` + `legal/PRIVACY.md` are canonical.
  `wincommander` bundles `assets/legal/EULA.md` into its EULA consent
  screen via a Vite `?raw` import; the site renders both on its legal pages.
  Do NOT create per-repo copies — update here and bump the submodule.
- **Public release scope.** ServaLabs-authored source and documentation are
  AGPL-3.0-or-later. Third-party media, marks, and logos stay subject to their
  original licences and trademark rules; do not add confidential collateral or
  assets without a redistribution right.
- **Product-folder name drift:** `products/private-phone/` = Privon,
  `products/private-server/` = Servault (old folder names kept to avoid breaking
  consumer paths). `marketing/` uses current names (`privon/`, `servault/`).
