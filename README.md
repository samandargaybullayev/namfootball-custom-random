# NAMFOOTBALL - Tournament Draw Generator

A fully responsive web application for generating tournament brackets with slot machine-style team selection animations, PDF export, and persistent data storage.

## Features

- **Interactive Team Selection**: Click on team slots to trigger a roulette animation that randomly selects teams from all 16 teams
- **Slot Machine Animation**: Smooth vertical scrolling animation (2 seconds) with easing effects showing all teams
- **Tournament Bracket**: Visual bracket layout with 8-2-1-1-2-8 structure
- **Team Group Allocation**: Intelligent team allocation based on groups (4 groups with 4 teams each)
- **PDF Export**: Export complete bracket results to PDF format when all teams are selected
- **Data Persistence**: All selected teams are saved to localStorage and persist on page refresh
- **Responsive Design**: Fully responsive layout for desktop, tablet, and mobile devices
- **Modern UI**: Green-yellow gradient theme with beautiful animations and effects

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling framework
- **Framer Motion** - Animation library
- **html2pdf.js** - PDF export functionality
- **localStorage** - Data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. Click on any team slot (showing "?") to start the roulette animation
2. The animation will scroll through all 16 teams and randomly select one based on slot rules
3. Once selected, the slot is locked and cannot be changed
4. Continue selecting teams until all 16 slots are filled
5. Click the cup in the center to export the bracket to PDF (only enabled when all 16 teams are selected)
6. All selected teams are automatically saved and will persist on page refresh

### Team Allocation Rules

- **8.1 Group (left)**: 
  - Slots 0, 2, 4, 6 → Group 1 teams
  - Slots 1, 3, 5, 7 → Group 3 teams

- **8.2 Group (right)**:
  - Slots 0, 2, 4, 6 → Group 2 teams
  - Slots 1, 3, 5, 7 → Group 4 teams

## Project Structure

```
src/
├── components/
│   ├── TournamentBracket.jsx  # Main bracket layout component
│   ├── TeamSlot.jsx            # Individual team slot with click handler
│   ├── RouletteAnimation.jsx   # Slot machine animation component
│   ├── Trophy.jsx             # Trophy component with export trigger
│   └── BracketLine.jsx        # Visual bracket connectors
├── hooks/
│   └── useTournament.js       # Tournament state management hook
├── utils/
│   └── excelExport.js         # Excel export functionality
├── constants/
│   └── teams.js               # Team list data
├── App.jsx                    # Main app component
├── main.jsx                   # React entry point
└── index.css                  # Global styles
```

## Team List

The application includes 16 teams:
- Barkamol Avlod
- Al Ittifoq
- Oromgoh oshxonasi
- Young Boys
- NT Holding
- FC Tigers
- FC Jiket
- FC Eagles
- Al Badr
- Falcon United
- Al Rizo Mebel
- FC Turan
- Oromgoh Bakery
- Nam United
- FC Asnam
- Rich Village

## Customization

### Adding/Removing Teams

Edit `src/constants/teams.js` to modify the team list.

### Styling

Customize colors and theme in `tailwind.config.js`. The main color scheme uses:
- Dark purple background: `#2A0A48`
- Neon purple accents: `#A855F7`
- Neon cyan: `#00F5FF`
- Gold trophy: `#FFD700`

### Animation Duration

Modify the `duration` prop in `RouletteAnimation.jsx` (default: 1800ms) or pass a custom duration to `TeamSlot`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
