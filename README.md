# NAMFOOTBALL - Custom Tournament Randomiser

A customized tournament draw generator for the Namfootball amateur league. This application features a "Planned Random" mode for pre-determined draws alongside a standard randomizer.

## Features

- **Hybrid Randomizer**:
  - **Real Random Mode**: Truly random selection from available teams.
  - **Planned Mode**: Pre-determined "Rigged" matchups defined in the configuration.
- **Stealth Toggle**:
  - Switch between modes using a hidden trigger on the central Cup icon.
  - **Right Click** (or Double Click) the Cup to toggle modes.
  - **Visual Feedback**: The Cup's glow changes subtly:
    - **Gold Glow**: Random Mode (Default)
    - **Greenish Glow**: Planned Mode (Rigged)
- **Interactive Slots**: Click slots to trigger roulette animations.
- **PDF Export**: Export the final bracket to PDF (click the Cup when finished).
- **Persistent State**: The current mode and selected teams are saved in browser storage.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/namfootball-custom-random.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run development server:
    ```bash
    npm run dev
    ```

## Usage Guide (Admin)

### Controlling the Randomizer
The application starts in **Random Mode** by default (or remembers the last state).

1.  **Check Status**: Look at the central Cup icon.
    *   **Gold/Yellow Glow**: Real Random.
    *   **Greenish Glow**: Planned (Rigged).
2.  **Toggle Mode**: **Right-Click** the Cup icon. You will see the glow change.
3.  **Reset**: Click the Refresh button (top-right) to clear the board.
4.  **Run Draw**: Click the slots to "generate" the teams.
    *   In **Planned Mode**, the teams will appear exactly as defined in `src/constants/teams.js` under `RIGGED_MATCHUPS`.
    *   In **Random Mode**, teams are picked randomly from the remaining pool.

### Configuration
To change the planned matchups, edit `src/constants/teams.js`:
```javascript
export const RIGGED_MATCHUPS = {
  'slot-group8-0': 'FC Turan',
  'slot-group8-1': 'Usta Tom Markazi',
  // ... maps slot IDs to Team Names
}
```

## Build
To build for production:
```bash
npm run build
```
