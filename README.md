# GlobeSweeper

A 3D spherical minesweeper game built with Three.js, featuring a geodesic Goldberg tiling on an icosphere.

## Features

- **Spherical Minesweeper**: Play minesweeper on a 3D sphere with hexagonal/pentagonal tiles
- **Modern UI**: Glassmorphic scoreboard with circular progress indicators
- **Debug Panel**: Comprehensive controls for game settings, visuals, and camera
- **Empty Tiles**: Transparent glass tiles that don't count toward exploration
- **Smart Reveal**: Queue-based cascade reveal system for smooth gameplay
- **Solvability Checking**: Ensures boards are solvable without guessing

## Controls

- **Left Click**: Reveal a tile
- **Right Click**: Flag/unflag a tile
- **Double Click**: Reveal adjacent tiles (if all mines are flagged)
- **Ctrl+Shift+Alt+D**: Toggle debug panel

## Game Settings

- **Tile Density**: Number of subdivisions (affects tile count)
- **Mine %**: Percentage of mines on the board
- **Empty Tile %**: Percentage of transparent empty tiles
- **Initial Reveal %**: Percentage of tiles revealed at game start

## Live Demo

Visit the [live demo](https://ozlphrt.github.io/GlobeSweeper/) to play the game.

**Note**: GitHub Pages may take a few minutes to deploy after the first push.

## Version History

### v2.2.2 (Current Stable)
- Re-engineered 3D geometry engine to create rounded fillet edges for all hexagonal and pentagonal tile pillars
- Implemented quadratic Bezier curve subdivision on all polygon corners (`getRoundedPoly`) with a fine-tuned corner fraction (0.08) for clean, geometric rounded corners
- Subdivided the horizontal edge bevels into a 3-segment quarter-circle fillet (rounded vertical profile) to smooth the transition between the top face and vertical walls under standard lighting
- Aligned tile borders and wireframe outlines with the inset rounded top faces
- Upgraded the in-place vertex scaling animation pipeline to support multi-segment bevel geometries seamlessly
- Maintained skip-wall optimization for empty tiles by mapping rounded sub-segments back to raw vertex coordinates

### v2.2.1
- Unified animation, label rotation, and back-face checks into a single loop pass (O(1) iterations when idle)
- Implemented `state.animatingTiles` Set tracking to only animate/process active tiles, avoiding O(n) whole-board scans
- Added back-face culling (`mesh.visible` flag) to hide tiles on the far side of the globe from both render & shadow passes
- Guarded label and warning flag rotation math to only execute on tiles that actually have rotatable elements
- Added adaptive shadow map quality: automatically lowers shadow resolution from 2048 to 1024 or 512 on high-complexity levels
- Fixed shadow acne artifacts (diagonal parallel bands on tiles) by configuring `shadow.normalBias` and fine-tuning `shadow.bias` on the directional light

### v2.2.0
- Redesigned top-left HUD layout with unified flexbox container (#hudContainer)
- Swapped Mines progress circle to the right side and Level/Lives stats badge to the left
- Compacted layout for short viewports (max-height: 550px) to prevent vertical overlap
- Enlarged Level indicators (28px) and Heart/Lives icons (22px) with enhanced glows
- Incremented PWA cache version to force client update

### v2.1.0
- Enabled high-performance, premium soft shadows (`THREE.PCFSoftShadowMap`)
- Added dynamic shadow frustum clipping plane calculations based on light position coordinates to prevent rendering artifacts
- Configured 3D warning markers/mines to cast shadows recursively on the globe
- Enabled dynamic self-shadowing for revealed extruding tiles casting onto neighboring shorter tiles
- Kept unrevealed tiles shadow-casting disabled to optimize rendering pipelines

### v2.0.0
- Fixed cascade reveal bug preventing disconnected tiles from being revealed
- Improved UI with reduced condensed scoreboard size
- Added iPhone safe area support to prevent status bar overlap
- Streamlined global presets to 14 carefully selected options
- Full PWA support with manifest and service worker

**Standalone URLs:**
- [Tree](https://github.com/ozlphrt/GlobeSweeper/tree/v2.1.0)
- [Release](https://github.com/ozlphrt/GlobeSweeper/releases/tag/v2.1.0)
- [Live Demo](https://ozlphrt.github.io/GlobeSweeper/)

## License

MIT License

