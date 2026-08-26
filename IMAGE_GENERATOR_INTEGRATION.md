# CALLBACK — Host Image Generator Setting

CALLBACK should expose one server-authoritative room setting named `imageGenerator` when the host creates/configures a game.

## Host choices

1. **Original**
   - id: `original`
   - model: `@cf/black-forest-labs/flux-1-schnell`
   - description: Current CALLBACK generator; fastest/cheapest.

2. **Balanced — Recommended**
   - id: `balanced`
   - model: `@cf/black-forest-labs/flux-2-klein-4b`
   - description: Better quality while remaining very fast.

3. **Quality**
   - id: `quality`
   - model: `@cf/black-forest-labs/flux-2-klein-9b`
   - description: Highest-quality option of the three, with higher usage per image.

Default: `balanced`.

## Required game behavior

- Show **Image Generator** in the host's game options before room start.
- Only the host can change it.
- Store the chosen value in the authoritative room settings as `room.settings.imageGenerator`.
- Lock the value once the game starts unless CALLBACK already allows hosts to change game settings mid-game.
- All image-generation requests for that room must resolve the model from the server-owned room setting; never trust a model id sent directly by a player client.
- Whitelist the three ids above. Invalid/missing values fall back to `balanced`.
- Send only the friendly id (`original`, `balanced`, `quality`) through multiplayer state. Do not expose Cloudflare credentials.

## Server-side model resolution

```js
const IMAGE_MODELS = Object.freeze({
  original: '@cf/black-forest-labs/flux-1-schnell',
  balanced: '@cf/black-forest-labs/flux-2-klein-4b',
  quality: '@cf/black-forest-labs/flux-2-klein-9b',
});

function resolveImageModel(imageGenerator) {
  return IMAGE_MODELS[imageGenerator] ?? IMAGE_MODELS.balanced;
}
```

When generating:

```js
const model = resolveImageModel(room.settings.imageGenerator);
const result = await env.AI.run(model, requestPayload);
```

## Important Cloudflare API detail

FLUX.2 Klein 4B and 9B on Workers AI use multipart-form inputs rather than assuming the exact request shape used by FLUX.1 Schnell. The existing CALLBACK image adapter should normalize the three models behind one internal `generateImage()` interface instead of duplicating game logic.

Suggested architecture:

```text
room.settings.imageGenerator
        ↓
ImageGenerator service
        ↓
model adapter / payload builder
        ↓
Cloudflare Workers AI
```

The room/game-state code should know only the friendly option id, not provider-specific request details.

## Host UI copy

**Image Generator**

- **Original** — Current generator. Fastest.
- **Balanced** — Better quality + fast. Recommended.
- **Quality** — Best image quality. Uses more AI allowance.

Use a single-choice segmented control, radio-card group, or three compact selection cards consistent with the existing CALLBACK options UI.

## Acceptance checks

- Creating three rooms with each setting produces three distinct stored values.
- `original` invokes FLUX.1 Schnell.
- `balanced` invokes FLUX.2 Klein 4B.
- `quality` invokes FLUX.2 Klein 9B.
- A joining player cannot override the host's image model.
- Refresh/reconnect preserves the room's selected option.
- Invalid settings fall back to `balanced`.
- If generation fails, CALLBACK handles the existing image-generation error path rather than corrupting the game phase.
