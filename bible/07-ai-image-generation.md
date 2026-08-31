# AI & Image Generation

## Role

AI-generated content supports the party-game loop and theatrical presentation. It is never authoritative game state.

## Current direction

- Keep Cloudflare as the current production direction.
- Host-facing profiles: **Flux.1 Schnell**, **Flux 2 Fast** and **Flux 2 Quality**.
- Keep exact provider/model identifiers behind a server-side adapter so profiles can change without rewriting mode rules.
- Never expose credentials in client code.
- Current curated request pool is all-ages.
- A future self-hosted ComfyUI path for adult-content games is a separate possibility, not current production.

## Pacing

Start jobs as early as the selected mode permits. King Prompter overlaps writing, generation and voting so slow media does not become dead time. Job completion may unlock media presentation, but it cannot redefine phase eligibility or scoring.

## Royal Restoration

Use reusable prebuilt torn-section overlays around the unchanged central King. Generate normal square images, clip each output into its assigned mask and stitch the sections with deliberate visible seams. Provider-native inpainting may improve coherence later but is not required for the approved composition rule.

## Failure behavior

Generation/narration failure must not corrupt room state or block a match. Retry within explicit limits, then attach a controlled voteable fallback. Store job status separately from official score events.

## Prompt and media records

Store the exact game prompt/input separately from generated media, provider profile, timestamps and durable object reference. History Books links the public-safe prompt and media while internal diagnostics may remain private.

## Validation and content handling

Treat all text/media as untrusted technical input: enforce length, encoding, schema, rate and file checks. No additional bespoke semantic submission moderation is part of the confirmed current design. Required provider/platform enforcement still applies.

## Future work

See `decisions/OPEN-DECISIONS.md` for provider identifiers, retry/timeouts, retention, public diagnostic fields and the possible separate ComfyUI deployment.
