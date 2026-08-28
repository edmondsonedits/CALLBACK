# Avatar Studio v2

**Status:** APPROVED PROTOTYPE

**Ready to guide integration:** YES

**Production integration confirmed:** NO

## Purpose

Provide an isolated, mobile-friendly environment for creating, fine-tuning, rendering and animating CALLBACK player avatars before the system is integrated into the full Sites game.

## What is proven

- compact JSON-style avatar configuration
- dependency-free SVG reconstruction
- modular face/hair/eyes/nose/mouth/glasses/facial-hair/outfit/body options
- 13 family look-alike presets
- fine-tune controls
- reusable puppet animation vocabulary
- responsive desktop/mobile editor behavior
- small integration API exposed through `window.CallbackAvatar`

## What is demo-only

The following behavior must **not** be treated as production multiplayer design:

- the on-page lobby is a local visualization demo
- adding an avatar to that lobby does not join a network room
- `localStorage` saving is device-local demo persistence
- the studio does not create stable multiplayer identity
- the studio does not implement reconnects
- the studio does not validate avatar data on a server

## Files

- `index.html` — standalone component test page
- `avatar-data.js` — palettes, options, presets and defaults
- `avatar-render.js` — SVG rendering engine
- `avatar-editor.js` — editor state and interactions
- `avatar-v2.css` — primary styling and animation definitions
- `avatar-polish.css` — later mobile/thumbnail polish
- `avatar-polish.js` — sticky live preview and accessibility polish
- `INTEGRATION.md` — production integration contract

## Testing goal

Use this component to decide whether avatar appearance, controls and animations are good enough. Once approved behavior is integrated into Sites, update its status to INTEGRATED rather than turning this standalone page into the authoritative multiplayer game.
