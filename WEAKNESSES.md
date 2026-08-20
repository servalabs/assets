# Weaknesses Ledger

- 2026-08-04 — Generative laptop mockups can subtly alter UI pixels and text; visually inspect generated assets against the source screenshot before publishing.
- 2026-08-04 — Banner background exports are RGB JPEGs without a printer-specific ICC profile or bleed; the production printer must apply its required profile and finishing allowance.

- 2026-08-05 — GitHub rejects blobs >100 MB. Large product demos (e.g. products/theron/Theron_Chat.gif ~117 MB) must use Git LFS (see .gitattributes) or be compressed below the limit before commit; plain git push will fail with GH001.

- 2026-08-12 — E: can fill completely from `wincommander/src-tauri/target` (~55 GB cargo cache). When free space approaches zero, local media reorgs leave 0-byte stubs and `git pull` fails on untracked overwrite + unable-to-write. Prefer cleaning rebuildable `target/` before large asset pulls; avoid duplicating in-progress product moves that already landed on origin.

- 2026-08-17 — The compressed-media rollout copied `compressed/` over the live originals for apps, editorial, entities, news, private-phone, private-server, theron, and most software, but left Fleet stills, several WinCommander stills, and `softwares/dotnet.svg` on the uncompressed originals. Consumers that import the live path (not `compressed/`) kept serving the large files. Copy the remaining same-basename compressed files over the originals whenever a folder is compressed.

- 2026-08-20 — The self-hosted Inter, Outfit, and Playfair Display variable fonts currently contain the Latin subset only. English pages render without an external font request, but future Cyrillic, Greek, Vietnamese, or broader multilingual copy will fall back to system fonts until the corresponding reviewed WOFF2 subsets are added.

- 2026-08-20 — `products/wincommander/Fleet/Fleet_overview-web.mp4` is the reviewed 1280-pixel web derivative used by the public site. Keep the 27.8 MB original as the archival master, and point browser consumers at the derivative so a below-the-fold visual does not carry production-master weight.
