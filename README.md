# servalabs-assets

Single source of truth for **ServaLabs product assets** — logos, icons, brand
marks, product screenshots, editorial imagery, fonts, and media. Consumed by
multiple repos (the `servalabs.com` website and the `commander` desktop app) as
a **git submodule** so a given asset lives in exactly one place.

> Private repo. Assets may carry third-party trademarks/copyright and are used
> under fair-use / editorial context within ServaLabs products.

## Taxonomy

```
app-icons/            third-party desktop-app icons (winget set; auto-fetched)
software/             third-party professional software icons (Adobe, Autodesk, …)
saas/                 cloud SaaS icons (Excel, Google Drive, iCloud, …)
icons/                service / feature / self-hosted icons (AdGuard, n8n, VPN, …)
logos/
  companies/          corporate logos (Google, Microsoft, Meta, NVIDIA, …)
  agencies/           government / intelligence / enforcement (NSA, CIA, …)
  privacy/            privacy & security vendors (Proton, Signal)
  crypto/             cryptocurrency logos (BTC, ETH, XMR, …)
  blocklist/          DNS-blocklist category site logos (adult, gambling, …)
flags/                country flags & national emblems
brand/
  servalabs/          ServaLabs corporate brand (globe, wallpaper)
  wincommander/       WinCommander brand mark
products/<product>/   product screenshots (wincommander, theron, private-server, …)
editorial/            news / scandal / "proof" imagery
fonts/                web fonts (woff2)
gallery/              decorative photography
video/                marketing videos
ui/                   in-app UI media (loading, panic-button, …)
docs/brief/           capability-brief screenshots
```

## How it's consumed

Each consuming repo adds this repo as a submodule and resolves an `@assets`
alias to it:

- **servalabs.com** — submodule at `assets/`; `@assets` → `../../assets`; assets
  imported through `apps/website/src/assets.ts` (typed manifest, Vite-fingerprinted).
- **commander** — submodule at `assets-shared/`; `@assets` → `./assets-shared`;
  assets imported through `src/assets.ts`. `tools/fetch-app-icons.ps1` writes into
  `app-icons/` here.

## Adding / updating an asset

1. Drop the file in the correct taxonomy folder, commit + push here.
2. In each consuming repo, `git submodule update --remote assets-shared` (or `assets`)
   and reference it from that repo's `assets.ts` manifest.
