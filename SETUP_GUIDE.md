# SportViz Setup Guide

## Overview
SportViz is an international cricket dashboard that displays live, upcoming, and completed cricket matches.

## Features Implemented

### ✅ Frontend (Next.js)
1. **Home Page** - Beautiful dashboard showing:
   - Live matches (if any)
   - Upcoming international cricket matches
   - Quick stats overview

2. **Matches Page** - Complete cricket match browser with tabs:
   - Live matches
   - Upcoming matches
   - Completed matches (Results)

3. **Under Construction Pages**:
   - Teams
   - Players
   - Stats

4. **Features**:
   - Responsive grid layout
   - Match cards with live indicators
   - Real-time data fetching
   - Clean, modern UI with Tailwind CSS

### ✅ Backend (Spring Boot)
- RESTful API for cricket matches
- CORS enabled for localhost:3000
- Mock data with international cricket matches
- Filter by status (live, upcoming, ft)

## Project Structure

```
SportViz/
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   ├── MatchCard.tsx        # Match display card
│   │   ├── MatchesTab.tsx       # Matches with tabs
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   └── UnderConstruction.tsx # Placeholder component
│   ├── lib/                     # Utilities
│   │   ├── api.ts               # API client
│   │   └── match.ts             # Type definitions
│   ├── types/                   # TypeScript types
│   │   └── match.ts             # Match interface
│   ├── matches/                 # Matches page
│   │   └── page.tsx
│   ├── teams/                   # Teams page (under construction)
│   ├── players/                 # Players page (under construction)
│   ├── stats/                   # Stats page (under construction)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── src/                         # Java Spring Boot backend
│   └── main/
│       ├── java/com/sportviz/
│       │   ├── SportVizApplication.java
│       │   ├── config/
│       │   │   └── CorsConfig.java
│       │   ├── controller/
│       │   │   └── CricketController.java
│       │   └── model/
│       │       └── Match.java
│       └── resources/
│           └── application.properties
├── package.json                 # Frontend dependencies
├── pom.xml                      # Backend dependencies
└── tsconfig.json                # TypeScript config
```

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- Maven

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the app:**
   Open http://localhost:3000 in your browser

### Backend Setup

1. **Build the project:**
   ```bash
   mvn clean install
   ```

2. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR:
   ```bash
   java -jar target/sportviz-backend-1.0.0.jar
   ```

3. **API is available at:**
   http://localhost:8080

## API Endpoints

### Cricket Matches
- `GET /api/cricket/matches` - Get all matches
- `GET /api/cricket/matches?status=live` - Get live matches
- `GET /api/cricket/matches?status=upcoming` - Get upcoming matches
- `GET /api/cricket/matches?status=ft` - Get finished matches
- `GET /api/cricket/matches/{id}` - Get specific match by ID

## Current Implementation

### Mock Data
The backend currently uses mock data with:
- 2 live matches
- 3 upcoming matches
- 3 completed matches

All matches are international cricket fixtures.

### Next Steps (Future Enhancements)

1. **Real Cricket API Integration**
   - Integrate with CricAPI or similar service
   - Fetch real-time match data
   - Add automatic data refresh

2. **Teams Page**
   - Team rankings
   - Team statistics
   - Team rosters

3. **Players Page**
   - Player profiles
   - Career statistics
   - Recent performances

4. **Stats Page**
   - Historical data
   - Records and achievements
   - Analytics and insights

5. **Additional Features**
   - Match details page
   - Live score updates (WebSocket)
   - Match commentary
   - User favorites
   - Notifications for match start

## Technologies Used

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **App Router** - File-based routing

### Backend
- **Spring Boot 3.2** - Framework
- **Java 17** - Programming language
- **Maven** - Build tool
- **Spring Web** - REST API

## Development Notes

- Frontend runs on port 3000
- Backend runs on port 8080
- CORS is configured to allow localhost:3000
- TypeScript path aliases use `@/*` for app directory
- Cricket-only focus (football support removed)

## License
This project is for educational purposes.
