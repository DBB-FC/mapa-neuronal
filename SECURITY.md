# Security

## Reporting a vulnerability

Open a [private security advisory](https://github.com/DBB-Labs/mapa-neuronal/security/advisories/new)
on this repository. Please do not open a public issue for a vulnerability.

Expect a first answer within a week. There is no bounty programme.

## What the plugin does with your data

- Your notes are read from the vault and stay there. The plugin has no server and no
  telemetry, and it makes no network request unless you ask for an AI suggestion.
- When you do, the two notes involved are sent to the AI provider **you** configured, with
  **your** key. That exchange is between you and that provider.
- API keys are stored in Obsidian's per-device local storage, never in `data.json`, so
  they do not travel through Obsidian Sync, git or a backup.
- External links declared in the frontmatter are opened only if they use `http` or
  `https`; a `javascript:`, `file:` or `data:` URL in a note is ignored.
- The plugin writes to a note only after you press Approve, and only as an appended line.
