# CALLBACK Avatar Studio

A mobile-first, layered SVG avatar system for CALLBACK.

## What is included

- One universal puppet skeleton with independently animated head, arms, legs, face and accessories.
- CALLBACK visual styling: navy/yellow UI, oversized cartoon heads, simple Mii-like recognition cues.
- Modular SVG avatar parts for face shape, skin, hair, eyes, mouth, glasses, facial hair, outfits and accessories.
- 13 family presets: Virginia, Gregory, Aaron, Liv, Danny, Kristin, Doug, Ruth, Judy, Brandon, Emily, Jaclyne and Alex.
- Mobile-friendly avatar editor with Randomize, Reset and Done controls.
- Reusable animations: idle, blink, look left/right, wave, think, laugh, shock, sad, cheer, point, dance and victory.
- Small preset personality loops such as beard movement, glasses adjustment, curl bounce and hat movement.
- A serialized player payload suitable for room synchronization.
- A small lobby demo showing how avatars can replace simple player blobs.
- `window.CallbackAvatar`, a dependency-free integration API for the future CALLBACK game client.

## Run locally

No build step is required. Open `index.html`, or serve this directory with any static web server.

## Integration API

```js
const player = CallbackAvatar.createPlayer('Danny', {
  hair: 'sidepart',
  hairColor: 'auburn',
  accessory: 'freckles'
});

const html = CallbackAvatar.render(player.avatar, { animation: 'cheer' });
container.innerHTML = html;
CallbackAvatar.applyAnimation(container, 'victory');
```

Room data only needs the player's name and small `avatar` configuration. Every client can rebuild the SVG locally.

## Current integration status

This repository did not contain the existing CALLBACK multiplayer game code when the avatar studio was added. The editor therefore includes the player payload, rendering API and lobby demonstration needed for integration, but it cannot replace player objects or trigger round-specific reactions in code that is not present in this repository yet.

When the main game client is moved into this repository, wire the avatar payload into the existing player/join message and call `CallbackAvatar.applyAnimation(...)` for waiting, voting, results, ties, zero-vote reactions and finale victory states.
