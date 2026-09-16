# Mapa neuronal

*English · [Leer en español](README.es.md)*

**See your vault as a layered neural network — and read *why* each note connects to the next.**

Obsidian's graph shows you *that* two notes are linked. It never tells you *why*. In a
vault of a few hundred notes that is a hairball: pretty, and useless for thinking.

Mapa neuronal lays your notes out in layers, left to right, the way information actually
moves through a knowledge base: what comes in → what it is about → what you learned →
what it all adds up to. Click any note and you get the sentence in which the link was
written. Not a guess: the real line from your own note.

<!-- capturas/01-mapa.png — vista completa del mapa, 4 capas, tema activo -->

## What it does

- **Layers, not a hairball.** You decide which folders belong to which layer (a wizard
  proposes one on first run). Notes inside a layer are ordered to minimise crossing
  lines, so the paths you see are the paths that exist.
- **Every link carries its reason.** Click a link and the panel shows either the reason
  you curated (`- [[note]] — why`) or the real sentence from the note where the link
  appears. Nothing is invented.
- **Paths.** Pick two notes and it draws the shortest chain between them, step by step,
  with the reason for each hop. This is how you find out that two projects you thought
  were related are actually four hops apart.
- **Gaps.** It compares the links that exist against the links you would expect between
  two topics (shared neighbours, density) and names the pairs that should be connected
  and are not. In my own vault it found two topics with 0 links where ~26 were expected.
- **Radial view.** Centre on one note and see its world in rings: direct neighbours,
  then theirs. The animation travels outward ring by ring.
- **Reasons with *your* AI (optional).** If you connect an AI provider, it proposes a
  reason for links that have none — always with a literal quote from both notes, always
  verified by code, and never written to your notes until you approve it.
- **English and Spanish.** The interface follows Obsidian's own language setting.
- **Works on the phone.** Same map, same proportions, touch gestures. No separate
  mobile build.
- **Export.** PNG for slides, an Obsidian Canvas you can keep editing, or a standalone
  HTML page.

## Install

Community plugins → Browse → search "Mapa neuronal" → Install → Enable.

Manual install: download `main.js`, `manifest.json` and `styles.css` from the latest
release into `<vault>/.obsidian/plugins/mapa-neuronal/`, then enable it in
Settings → Community plugins.

Open it with the command **Open neural map** (`Cmd/Ctrl+P`) or the brain icon in the
left ribbon.

## First run, in one minute

1. Open the map. A wizard lists your folders with a proposed layer for each one
   (Input / Entities / Knowledge / Topics / Don't show). Change what looks wrong and
   press Apply.

   <!-- capturas/02-asistente.png — asistente de capas -->

2. Click any note. The side panel names its layer, its topic, a two-line summary and
   every link with its reason.

   <!-- capturas/03-panel.png — panel lateral con motivos -->

3. `···` → **Path between two notes**, pick two, and read the chain.

   <!-- capturas/04-camino.png — camino entre dos notas -->

That's it. No configuration needed beyond the wizard, and no AI key required for any of
the above.

## Settings worth knowing

| Setting | What it changes |
|---|---|
| **Layers** | One line per layer: `Name \| description`. Three to five works best. |
| **Folders** | Which folder goes to which layer. The wizard writes this for you. |
| **Topic property** | The frontmatter property that groups and colours notes (default `tema`). Empty = no topics. |
| **Notes visible per layer** | In large vaults each layer shows its most connected notes; the rest appear when you search or open them. Default 150. |
| **Connections section** | The heading at the end of each note where approved reasons are written. |
| **External links property** | Frontmatter properties holding web links (`Title \| https://…`, `https://…`, `user/repo`). Empty = the section never appears. Only `http`/`https` are opened. |
| **Last-modified property** | If set, approving a reason also writes today's date in that property. Empty by default: the plugin never touches your frontmatter. |
| **Animation** | Light pulses travelling along the links. Only while the map is visible, and off if your system asks for reduced motion. |

## Bring your own AI (optional)

The map works with no AI at all. If you connect one, it can propose reasons for links
that have none and short summaries for notes that have no description.

Supported: **Anthropic (Claude)**, **OpenAI**, **Google (Gemini)**, and any
**OpenAI-compatible local server** (Ollama, LM Studio, LocalAI) — the local option
needs no key and no internet.

<!-- capturas/05-ia.png — selector de proveedor en ajustes -->

Reasons and summaries are written **in the language of your notes**, not in the language of
the interface.

Three rules the plugin enforces, whatever provider you pick:

1. **Quotes are verified by code.** The model must return a literal quote from each of
   the two notes. The plugin looks for those quotes in the files. If a quote is not
   there, the proposal is marked unverifiable and cannot be approved. This is what
   stops confident invention.
2. **A second pass reviews the first.** A separate call checks the reason against the
   quotes for negations, states and pending items ("we decided not to use X" must not
   become "we use X"). You can turn it off; it costs twice as much and catches the
   subtle errors.
3. **Nothing is written without you.** Approving is a click. Only then does the reason
   go into your note, under the heading you configured, and only as a new line — the
   plugin never rewrites existing text.

Every approval is logged (date, model, quotes, resulting text) in a note under the audit
folder, so you can audit or undo later.

### Measured accuracy

On a real vault of 254 notes and 916 links, over a reproducible sample of 44 links
reviewed blind against the source notes:

| | Correct | Wrong or invented | Unverifiable (blocked) |
|---|---|---|---|
| First attempt: small model, only the link's sentence | 48% | 16% | — |
| Current method: full notes + verified quotes + second pass | **97.7%** | **0%** | 2.3% |

That measurement was made with **Claude Opus 5**. With other models the locks still
apply — a proposal without verifiable quotes still cannot be approved — but the hit rate
is untested; treat it as unknown until you measure it on your own vault.

### Cost and privacy

- Your notes go to the provider **you** choose, with **your** key, at **your** cost. The
  plugin has no server. The author never sees your notes, your keys or your queries.
- Keys are stored per device in Obsidian's local storage — never in `data.json`, so they
  never travel through git, Obsidian Sync or a backup.
- Nothing is sent until you ask for a suggestion. Opening the map, browsing, paths and
  gaps make zero network calls.
- Rough cost per suggestion with Claude Opus 5: two notes of context plus the review
  pass. A vault with a hundred reason-less links costs single-digit dollars to work
  through — and you never have to do it in one go.
- The local provider (Ollama) sends nothing anywhere: no key, no internet, no cost.

## Large vaults

Tested on a vault with 5,043 notes and 17,526 links. Each layer draws its most
connected notes (default 150) and reveals the rest on demand, so the map stays
interactive instead of drawing a grey rectangle. Radial view caps each ring at 80.

## Does it change my notes?

Only when you press **Approve** on an AI suggestion, and only as an appended line in the
connections section of that one note. Existing text is never rewritten or reordered, and
your frontmatter is not touched unless you fill in the *Last-modified property* setting,
which is empty by default.

Everything else — layers, colours, paths, gaps, exports — is read-only. Exports are the
one other write: a PNG into the folder you choose.

There is no telemetry, no analytics and no server: the plugin makes no network request
except the AI call you ask for, to the provider you configured.

## Looks

The map draws on a dark canvas in both light and dark Obsidian themes — like a night sky,
so the topic colours and the light pulses along the links stay readable. The panel, the
chips and the settings follow your theme.

## Build from source

The licence is source-available: you can read and compile exactly what runs.

```bash
npm install
npm test        # builds src/main.js → main.js and checks the translations
npx eslint src/ # the official Obsidian plugin linter
./instalar-en-vault.sh /path/to/your/vault
```

`src/main.js` is the source. `main.js` in the repository root is the build output and is
not committed — releases carry it. The build is a single esbuild pass, no minification, so
the released file stays readable.

## Licence

In the Obsidian directory this plugin is labelled **optional payments**: it works fully
for personal use with no payment, and it can connect to paid AI services with your own key.

Source-available, not open source. Free for personal use; a Pro licence is required for
use inside a company or to provide services to third parties. See [LICENSE](LICENSE)
(Spanish, binding) or its [English translation](LICENSE.en.md).
Pro licences and licensing questions: licencias@dontbuybuild.cl.

## Support

Bugs and ideas: GitHub issues. Include your Obsidian version, your platform, and the
number of notes and links the map header shows.
