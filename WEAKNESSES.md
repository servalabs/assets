# Weaknesses Ledger

- 2026-08-04 — Generative laptop mockups can subtly alter UI pixels and text; visually inspect generated assets against the source screenshot before publishing.
- 2026-08-04 — Banner background exports are RGB JPEGs without a printer-specific ICC profile or bleed; the production printer must apply its required profile and finishing allowance.

- 2026-08-05 — GitHub rejects blobs >100 MB. Large product demos (e.g. products/theron/Theron_Chat.gif ~117 MB) must use Git LFS (see .gitattributes) or be compressed below the limit before commit; plain git push will fail with GH001.