# Component Lab

Components in this directory are isolated prototypes used to test parts of CALLBACK / King Prompter before integration into the complete Sites game.

A component is not automatically production code simply because it works.

## Required status labels

- **CONCEPT** — idea/specification only
- **PROTOTYPE** — working experiment, not yet approved
- **APPROVED** — reviewed and suitable to guide integration
- **INTEGRATED** — equivalent behavior confirmed in the production/Sites game
- **DEPRECATED** — should no longer guide implementation

Each component folder should contain a README stating purpose, status, proven behavior, demo-only behavior, known limitations and integration notes.

## Current experiments

### Royal Misread

**Status:** PROTOTYPE  
[Open the prototype documentation](./royal-misread/README.md)

Shared-prompt phone drawing experiment where every submitted sketch immediately starts a reference-image AI interpretation job, followed by artist-controlled TV reveals, a gallery vote and cumulative scoring. Includes a local no-AI fallback plus a deployable Cloudflare Workers AI adapter for FLUX.2 Klein 4B.
