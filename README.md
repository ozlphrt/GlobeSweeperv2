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

### v2.1.0 (Current Stable)
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

