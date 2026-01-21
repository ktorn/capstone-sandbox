# p5.js DVD Screensaver — Planning

## Goal
Build a simple p5.js sketch that resembles the classic “DVD logo” screensaver:
- A logo moves diagonally and **bounces** off the canvas edges.
- Each time it bounces, it **changes color**.

## Core requirements (MVP)
- **Canvas**: Full-window canvas (resizes with the browser window) *or* a fixed-size canvas (choose one).
- **Logo**:
  - Render a “DVD” mark (either an image asset or vector/text-based).
  - Has a position \((x, y)\), velocity \((vx, vy)\), and size \((w, h)\).
- **Movement**:
  - Logo moves every frame: `pos += vel`.
  - **Edge collisions**: if the logo would go outside the canvas, it bounces:
    - Reflect velocity on the relevant axis (invert `vx` for left/right; invert `vy` for top/bottom).
    - Clamp position so it stays fully inside the canvas.
- **Color change on bounce**:
  - On each bounce event, the logo’s color changes.
  - If it hits a corner and bounces on both axes in one frame, that counts as **one** bounce event (or two) — define behavior.
- **Controls (minimal)**:
  - Start running automatically on load.
  - Optional: click to randomize color; key to pause/resume (decide).

## Visual design decisions (pick one per section)
### Logo rendering approach
- **Option A: Text-based**: Draw “DVD” with `text()` using a bold font; color via `fill()`.
  - Pros: no assets, simplest.
  - Cons: less authentic.
- **Option B: Vector-based**: Approximate the DVD logo with shapes (ellipses/rects) and text.
  - Pros: more “logo-like” without external assets.
  - Cons: more drawing work.
- **Option C: Image-based**: Use an SVG/PNG for the logo; tint it via p5 (`tint()`).
  - Pros: most authentic.
  - Cons: needs an asset and loading logic.

### Background style
- **Solid black** (classic)
- Subtle gradient / noise (still minimal)

### Color palette strategy
- **Random bright color** on bounce (avoid too-dark colors).
- Cycle through a curated palette.
- Hue shift in HSB for smooth variety.

## Physics / collision details
- **Collision detection** uses the logo’s bounding box:
  - Left wall: `x <= 0`
  - Right wall: `x + w >= canvasWidth`
  - Top wall: `y <= 0`
  - Bottom wall: `y + h >= canvasHeight`
- **Bounce response**:
  - If left/right collision: `vx *= -1`
  - If top/bottom collision: `vy *= -1`
  - Then clamp:
    - `x = constrain(x, 0, canvasWidth - w)`
    - `y = constrain(y, 0, canvasHeight - h)`
- **Corner case**:
  - If both axis collisions occur in the same frame, define whether:
    - **Single** color change (recommended, feels like one “impact”), or
    - **Two** color changes (can flicker unpredictably).

## Non-goals (keep it simple)
- No sound.
- No complex UI.
- No physics beyond simple reflection.
- No persistence/storage.

## Nice-to-haves (after MVP)
- **Perfect corner hit** detection counter (how many times it hits exactly a corner).
- Speed controls (slider or keys).
- Trails / motion blur effect (optional).
- Multiple logos bouncing.
- “DVD” text switches to different brands (Easter egg mode).

## File/tech constraints (to confirm later)
- Use **p5.js** in the browser (single `index.html` + `sketch.js`), or use a small bundler template.
- Keep dependencies minimal.

## Defaults chosen for the first implementation
- **Canvas**: full-window responsive.
- **Logo**: text-based “DVD” in a bold sans font (no external asset).
- **Color change rule**: one color change per frame if any bounce occurs (corner counts as one).
- **Speed**: fixed, modest diagonal speed with random initial direction.
- **Controls**: none; auto-runs on load.
- **Background/palette**: solid black background; random bright HSB colors on bounce.

## Definition of Done (MVP)
- Logo bounces indefinitely within the canvas, never clipping outside.
- Color changes reliably on bounce as per the chosen rule.
- Runs smoothly at normal frame rates and behaves correctly on resize (if full-window).

