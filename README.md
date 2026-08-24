# ServaLabs Shared Assets

Shared media and source components used by ServaLabs products. This repository
is the canonical home for the assets that need to be reused by both
[`servalabs.com`](https://github.com/servalabs/servalabs.com) and
[`wincommander`](https://github.com/servalabs/wincommander).

## Contents

```
apps/          self-hosted and third-party app icons
brand/         ServaLabs brand marks and generation source
components/    shared React/TypeScript source components
editorial/     sourced editorial imagery used by the Risk Matrix
entities/      third-party company, agency, and government logos and flags
fonts/         web fonts
legal/         public legal documents rendered by the website and desktop app
news/          public newsroom and event media
products/      product screenshots and demonstration media
softwares/     software and service icons
```

## Use in consumer projects

`servalabs.com` and `wincommander` consume this repository as the `assets/`
submodule and map `@assets` to it. Keep those consumers aligned when moving or
renaming an asset path.

The shared `components/risk-matrix` component is consumed as source. It owns
its imported imagery and requires React 19, Framer Motion 12, Lucide React 1,
and a Vite build. A host mounting it outside its application directory should
dedupe `react`, `react-dom`, `framer-motion`, and `lucide-react` in Vite.

## Licensing and third-party material

ServaLabs-authored source code and documentation in this repository are
licensed under the [GNU Affero General Public License v3.0 or later](LICENSE).

Media, third-party logos, trademarks, and other material not owned by
ServaLabs are **not** relicensed by the AGPL. They remain subject to the rights
holder's licence, terms, and trademark policy. Their presence here does not
grant permission to reuse them outside the documented product or editorial
context. Review and remove any asset without a public redistribution right
before adding it to this repository.

The canonical public legal sources are `legal/EULA.md` and `legal/PRIVACY.md`.
Their generated Word copies are `legal/EULA.docx` and `legal/PRIVACY.docx`.
The website and WinCommander render the Markdown sources; the DOCX files are
portable copies for distribution and review, not independent sources.

## Development

This package has no build step. Its peer dependencies document the runtime
requirements of the shared React component. From this directory:

```sh
bun install
```

When adding an asset, place it in the existing taxonomy, preserve source and
rights information where relevant, and update every consumer that imports its
path. For contributor-specific guidance, see [AGENTS.md](AGENTS.md).
