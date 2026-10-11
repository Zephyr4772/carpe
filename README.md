# carpe

**A desktop-OS interface in the browser** — draggable windows, a tiled icon grid,
and retro window chrome, built as a React front-end study.

## Attribution

This is a **rebuild of [bychudy.com](https://bychudy.com)'s interface**, done to
study how the desktop-metaphor layout and window management are put together. The
design is not mine. `package.json` still carries the working name `bychudy-clone`.

If you're looking for original design work, this isn't it — it's a reimplementation
exercise, and it's published as one.

## What it does

- Windows that open, focus, and drag, with a z-order stack
- A tiled icon grid as the desktop surface
- Per-window content driven by data rather than hardcoded markup (`src/data/windowContent.js`)
- A projects registry (`src/data/projects.js`)

## Stack

React 19 · Vite 8 · Oxlint. No UI framework — layout and chrome are hand-written CSS.

## Run it

```bash
git clone https://github.com/Zephyr4772/carpe.git
cd carpe
npm install
npm run dev
```

`npm run build`, `npm run preview`, `npm run lint` also available.

## Layout

```
src/
  components/
    ProjectWindow.jsx   a window frame + its content
    Tile.jsx            desktop icon
  data/
    windowContent.js    window body content
    projects.js         project registry
  App.css               window chrome, desktop surface
```

## Limitations

- Desktop-oriented: the window metaphor doesn't adapt well to small screens.
- No tests.
- Window state is in-memory — nothing persists across reloads.
