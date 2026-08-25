# CALLBACK Hybrid Avatar System

This repository is now the **hybrid illustrated avatar system** for CALLBACK. It replaces the earlier primitive SVG/Mii-style avatar renderer.

## What changed

- 13 illustrated family presets: Virginia, Gregory, Aaron, Liv, Danny, Kristin, Doug, Ruth, Judy, Brandon, Emily, Jaclyne, Alex.
- High-quality illustrated head assets are kept separate from the body system.
- Reusable body/outfit choices are sourced from the same consistent character artwork.
- The editor supports family presets, head selection, body selection, simple alignment, themes, and reusable CSS animations.
- No image-generation API is needed during gameplay.
- The browser stores only a compact configuration object.

## Why the artwork is stored in JS chunks

The images are WebP sprite sheets encoded into small JavaScript data chunks in `assets/`. This keeps the entire pack portable through GitHub and easy for GPT-5.6 Sol / @Sites to copy without needing a separate binary upload workflow. `avatar-assets.js` joins the chunks into local data URLs at runtime.

## Important files

- `index.html` — working reference editor.
- `styles.css` — CALLBACK UI and animation system.
- `app.js` — avatar editor / renderer logic.
- `avatar-assets.js` — assembles the embedded artwork.
- `manifest.json` — family/body mappings and animation vocabulary.
- `SITES-INTEGRATION.md` — instructions for the full CALLBACK @Sites game.
- `assets/*-data-*.js` — embedded WebP sprite data.

## Player data

```json
{
  "type": "callbackHybridAvatar",
  "preset": null,
  "head": "gregory",
  "body": "broad-blue",
  "headSize": 82,
  "headX": 0,
  "headY": 0,
  "theme": "cream"
}
```

The old `avatar-data.js`, `avatar-render.js`, `avatar-editor.js`, `avatar-v2.css`, and polish-layer files are intentionally removed. Their history remains available in Git.
