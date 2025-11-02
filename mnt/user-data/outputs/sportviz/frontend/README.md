# SportViz Frontend

Modern Next.js dashboard for displaying live sports data (Cricket & Football).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## Features

- 🏏 Cricket and ⚽ Football match tracking
- 🔴 Live match updates
- 📅 Upcoming fixtures
- ✅ Match results
- 🎨 Clean, responsive UI
- 🔄 Real-time data from backend API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and set the backend API URL (default: `http://localhost:8080`)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Home page
│   ├── matches/             # Matches page
│   ├── teams/               # Teams page (placeholder)
│   ├── players/             # Players page (placeholder)
│   ├── stats/               # Stats page (placeholder)
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── TopBar.tsx          # Header with sport selector
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── MatchCard.tsx       # Match display card
│   └── MatchesTab.tsx      # Tabbed matches view
├── lib/                     # Utilities
│   └── api.ts              # API client functions
├── types/                   # TypeScript types
│   └── match.ts            # Match data types
└── public/                  # Static assets
```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend connects to the Java Spring Boot backend at `http://localhost:8080`.

### Endpoints Used

- `GET /api/cricket/matches` - Fetch cricket matches
- `GET /api/cricket/matches?status=live` - Fetch live cricket matches
- `GET /api/football/matches` - Fetch football matches
- `GET /api/football/matches?status=upcoming` - Fetch upcoming football matches

## Key Features Explained

### Sport Selector
Toggle between Cricket and Football in the top bar to switch sports.

### Match Tabs
- **Live** - Currently ongoing matches with live scores
- **Upcoming** - Scheduled future matches
- **Results** - Completed matches with final scores

### Match Cards
Each card displays:
- Team names
- Current/final scores
- Match status (Live, Upcoming, Full Time)
- Venue information
- Match start time

## Customization

### Changing Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#1e40af', // Change primary color
      secondary: '#7c3aed', // Change secondary color
    },
  },
}
```

### Adding New Pages
1. Create a new folder in `app/`
2. Add `page.tsx` file
3. Update sidebar links in `components/Sidebar.tsx`

## Building for Production

```bash
npm run build
npm run start
```

## Next Steps

- Add user authentication
- Implement match details page
- Add live score WebSocket updates
- Create team and player profile pages
- Add search and filter functionality
- Implement favorite teams/matches
