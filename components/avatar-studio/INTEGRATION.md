# Avatar Studio — Integration Contract

## Goal

Integrate the approved avatar model into the full CALLBACK / King Prompter game without copying the studio's demo-only multiplayer behavior.

## Player data

A production player should have a stable server-side player ID. Avatar appearance is an attribute of that player.

Conceptually:

```json
{
  "playerId": "server-owned-stable-id",
  "displayName": "Danny",
  "avatar": {
    "schemaVersion": 1,
    "...": "validated avatar configuration"
  }
}
```

Exact transport/schema syntax may differ, but stable identity must not depend on display name or avatar appearance.

## Join flow

Recommended flow:

1. Player enters room code / opens join flow.
2. Player enters display name.
3. Player selects a preset or creates/fine-tunes an avatar.
4. Client submits the requested identity attributes to the authoritative room service.
5. Server validates allowed avatar fields/values and associates them with the stable player identity.
6. Room state broadcasts the validated player/avatar configuration to relevant clients.
7. Each client reconstructs SVG locally.

## Rendering API

The prototype exposes `window.CallbackAvatar` with rendering/animation helpers. Sites may copy the underlying model/renderer or adapt it to the production module system, but should preserve the compact-configuration concept.

## Validation

Before production use:

- add `schemaVersion`
- whitelist known enum values
- clamp numeric fine-tune ranges
- bound display-name length
- ignore unknown fields
- fall back safely when a field is invalid

## Reconnect

Reconnect restores the server-side player record and avatar. Do not create a new player merely because the browser page reloads.

## Game reactions

Authoritative game events may map to avatar presentation, for example:

- lobby/waiting → idle
- thinking/submitting → think
- reveal reaction → laugh/shock
- round winner → cheer
- final winner → victory

These animations never determine scoring or phase transitions.

## Do not integrate

Do not copy the local fake lobby as room architecture. Do not use browser `localStorage` as the authority for multiplayer player identity or official room state.
