# WatchFinder - Watch Recommendation System

A modern, intelligent watch recommendation system that helps users discover their perfect timepiece based on their preferences, budget, and lifestyle.

## Features

- **Natural Language Search**: Describe what you're looking for in plain language - the system understands context like "I need a watch for swimming" or "elegant for business meetings"
- **Smart Recommendations**: Uses keyword matching and context analysis to provide relevant watch suggestions
- **Budget Slider**: Filter watches by your budget (from $100 to $50,000+)
- **Gender Preferences**: Filter by Men's, Women's, or Unisex watches
- **Match Scoring**: See how well each recommendation matches your criteria
- **Direct Links**: Quick access to official brand collection pages
- **Modern UI**: Beautiful, responsive design with smooth animations

## Watch Categories

- Dive Watches (Rolex Submariner, Omega Seamaster, Seiko Prospex, etc.)
- Dress Watches (Patek Philippe, Cartier Tank, JLC Reverso, etc.)
- Sport/Racing Watches (Rolex Daytona, TAG Heuer Carrera, Omega Speedmaster)
- Pilot/Aviation Watches (IWC Big Pilot, Breitling Navitimer, Hamilton Khaki)
- Outdoor/Field Watches (G-Shock, Luminox)
- Minimalist/Bauhaus (Nomos Tangente, Junghans Max Bill)
- Smartwatches (Apple Watch, Samsung Galaxy Watch, Garmin Fenix)
- Luxury Sports (Audemars Piguet Royal Oak)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/watch-recommendation-system.git
cd watch-recommendation-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with animations and glassmorphism effects

## How the Recommendation Engine Works

The recommendation system uses a multi-factor scoring algorithm:

1. **Keyword Matching**: Matches user input against watch keywords (e.g., "diving", "elegant", "rugged")
2. **Context Analysis**: Understands context like "gift for father's retirement" or "first date"
3. **Budget Filtering**: Considers price range compatibility
4. **Gender Matching**: Filters based on gender preference
5. **Brand/Collection Recognition**: Boosts scores when specific brands are mentioned

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
