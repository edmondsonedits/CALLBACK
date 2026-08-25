# CALLBACK @Sites Integration — Hybrid Avatar System

## Objective

Replace the current low-detail procedural SVG avatars in the full CALLBACK game with this repository's hybrid illustrated avatar system.

**Do not redraw, trace, simplify, or regenerate the supplied illustrated faces.** The point of this system is that the likeness artwork is already prepared and the game only has to display and animate it.

## Assets

Load the `assets/family-data-*.js` and `assets/head-data-*.js` files, then `avatar-assets.js`. They create:

```js
window.CallbackHybridAssets.family
window.CallbackHybridAssets.heads
```

Both are local `data:image/webp;base64,...` URLs. There is no API key and no remote image dependency.

## Family quick-pick presets

The 13 presets are:

`virginia, gregory, aaron, liv, danny, kristin, doug, ruth, judy, brandon, emily, jaclyne, alex`

Use these as the first/default avatar choice in CALLBACK. A player should be able to tap their family preset and immediately continue to the room-code flow.

## Rendering finished presets

The family artwork is a 4×4 sprite sheet. Each person is mapped in `manifest.json` by `col` and `row`.

For a sprite cell:

```css
.avatar-art {
  background-image: var(--family-sprite);
  background-size: 400% 400%;
}
```

Use `background-position` of 0%, 33.333%, 66.667%, or 100% on each axis according to the col/row.

## Hybrid/custom mode

Use two layers inside one `position: relative` avatar container:

1. **Body layer** — render a family sprite cell from the body source defined in `manifest.json`, and hide/clip its original head with `clip-path: inset(29% 0 0 0)`.
2. **Head layer** — render the selected person from the separate head sprite above the body.

Keep the head layer independently transformable so it can bob, tilt, squash, and react without changing the body art.

## Store only this config

```js
{
  type: "callbackHybridAvatar",
  preset: null,       // or a family preset name
  head: "gregory",
  body: "broad-blue",
  headSize: 82,
  headX: 0,
  headY: 0,
  theme: "cream"
}
```

Do not synchronize image bytes between players. Every client already has the art. Only synchronize the small config object.

## Game animations

The reference editor includes reusable CSS states. Use the same vocabulary across the full game:

- `idle` — subtle body/head bob
- `wave` — greeting/lobby reaction
- `think` — answer-writing state
- `laugh` — funny result reaction
- `shock` — reveal reaction
- `sad` — zero-vote/loss reaction
- `point` — voting/result emphasis
- `cheer` — round winner
- `dance` — celebration
- `victory` — final winner

The full game can later upgrade to separated arms/hands or Rive puppet animation without changing the player data format.

## Where to use avatars in CALLBACK

- First screen: family quick-pick + `Create / fine-tune`.
- Lobby: idle/wave animations.
- Submission: think animation.
- Voting: point/look reactions.
- Results: laugh/shock/sad/cheer depending on outcome.
- Tie: animate both tied players.
- Final champion: larger victory animation.

## Mobile requirements

Test at minimum:

- 360 px
- 390 px
- 412 px
- tablet
- desktop

The avatar must remain visible while editing, controls must stay in-frame, touch targets should be about 44 px minimum, and there must be no page-level horizontal overflow.

## Migration rule

Remove the old procedural SVG/Mii avatar implementation. Do **not** run both systems in parallel. The hybrid system in this repository is the source of truth going forward.
