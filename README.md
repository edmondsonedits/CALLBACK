# CALLBACK Avatar Studio

A mobile-first, layered SVG avatar system for CALLBACK. Version 2 focuses on family resemblance while keeping the characters simple, playful, and animation-friendly.

## Avatar Studio v2

- 13 hand-tuned family presets: Virginia, Gregory, Aaron, Liv, Danny, Kristin, Doug, Ruth, Judy, Brandon, Emily, Jaclyne and Alex.
- A Mii-style **Choose a Look-Alike → Fine Tune** workflow.
- Original CALLBACK SVG artwork; no third-party avatar art is bundled.
- Modular face shapes, skin tones, age details, hairstyles, hair colours, brows, eyes, eye colours, noses, mouths, glasses, facial hair, outfits, hats and stackable extras.
- Fine-tune controls for facial width/length, hairline, eyebrow height/angle/spacing, eye size/spacing/height/tilt, nose size/height, mouth width/height, glasses size/height, beard size and body proportions.
- Stackable details such as freckles, earrings, necklaces, chokers and cross-body straps.
- Reusable SVG puppet animations: idle, blink, look left/right, wave, think, laugh, shock, sad, cheer, point, dance and victory.
- Small preset personality motion for curls, beards, glasses and hats.
- Compact JSON player payload and `window.CallbackAvatar` integration API.
- Responsive phone/desktop UI and a lobby demo containing all family presets.

## Architecture

The editor follows a small-config / SVG-renderer architecture: each player stores only avatar settings, and the character is reconstructed locally. This keeps multiplayer payloads small and makes every avatar compatible with the same animation skeleton.

Files:

- `avatar-data.js` — options, palettes, family presets and default config.
- `avatar-render.js` — dependency-free SVG rendering engine.
- `avatar-editor.js` — editor state, fine-tuning controls, presets, animations and integration API.
- `avatar-v2.css` — responsive CALLBACK UI and puppet animations.
- `index.html` — Avatar Studio interface.

## Integration example

```js
const player = CallbackAvatar.createPlayer('Danny', {
  faceShape: 'long',
  hairStyle: 'sweptUp',
  hairColor: 'auburn',
  eyeColor: 'blue',
  extras: ['freckles']
});

container.innerHTML = CallbackAvatar.render(player.avatar, {
  animation: 'cheer',
  label: player.name
});
```

The existing CALLBACK multiplayer client is still separate from this repository, so the studio exposes the integration API and serialized player data needed for the eventual room/join wiring.
