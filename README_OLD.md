# SportViz 🏏⚽

A modern, full-stack sports dashboard application displaying live Cricket and Football match data.

## Overview

SportViz is a real-time sports tracking application with a clean, responsive UI built with Next.js and a robust Java Spring Boot backend API.

### Features

- ✅ **Dual Sport Support** - Cricket & Football
- 🔴 **Live Matches** - Real-time score updates
- 📅 **Upcoming Fixtures** - Never miss a match
- 📊 **Match Results** - Complete history
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🚀 **Fast API** - RESTful backend with Spring Boot

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React 18** - Latest React features

### Backend
- **Java 17+** - Modern Java
- **Spring Boot 3.2** - Production-ready framework
- **Maven** - Dependency management
- **REST API** - Standard HTTP endpoints

## Project Structure

```
sportviz/
├── frontend/           # Next.js application
│   ├── app/           # Pages and layouts
│   ├── components/    # React components
│   ├── lib/           # API utilities
│   ├── types/         # TypeScript definitions
│   └── README.md      # Frontend documentation
│
├── backend/           # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/com/sportviz/
│   │       │   ├── controller/    # REST controllers
│   │       │   ├── model/         # Data models
│   │       │   ├── config/        # Configuration
│   │       │   └── SportVizApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml        # Maven configuration
│   └── README.md      # Backend documentation
│
└── README.md          # This file
```

## Quick Start

### Prerequisites

**Backend:**
- Java 17 or higher ([Download](https://adoptium.net/))
- Maven 3.6+ ([Download](https://maven.apache.org/download.cgi))

**Frontend:**
- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation & Setup

#### 1. Clone/Download the Project

```bash
cd sportviz
```

#### 2. Start the Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

The backend API will start on `http://localhost:8080`

**Verify backend is running:**
```bash
curl http://localhost:8080/api/cricket/matches
```

#### 3. Start the Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

#### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Cricket

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cricket/matches` | Get all cricket matches |
| GET | `/api/cricket/matches?status=live` | Get live matches only |
| GET | `/api/cricket/matches?status=upcoming` | Get upcoming matches |
| GET | `/api/cricket/matches?status=ft` | Get finished matches |
| GET | `/api/cricket/matches/{id}` | Get specific match |

### Football

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/football/matches` | Get all football matches |
| GET | `/api/football/matches?status=live` | Get live matches only |
| GET | `/api/football/matches?status=upcoming` | Get upcoming matches |
| GET | `/api/football/matches?status=ft` | Get finished matches |
| GET | `/api/football/matches/{id}` | Get specific match |

### Example Response

```json
{
  "id": "c1",
  "sport": "cricket",
  "teamA": "India",
  "teamB": "Australia",
  "status": "live",
  "scoreA": "245/4 (45.2)",
  "scoreB": "178 (40.5)",
  "startTime": "2025-11-01T10:00:00",
  "venue": "Melbourne Cricket Ground"
}
```

## Usage

### Switching Sports
Use the sport selector in the top bar to toggle between Cricket 🏏 and Football ⚽.

### Viewing Matches
- **Live Tab** - See ongoing matches with current scores
- **Upcoming Tab** - Browse scheduled fixtures
- **Results Tab** - Check completed match results

### Navigation
Use the sidebar to navigate between:
- Home - Main dashboard
- Matches - All matches view
- Teams - (Coming soon)
- Players - (Coming soon)
- Stats - (Coming soon)

## Development

### Running in Development Mode

**Backend (with hot reload):**
```bash
cd backend
mvn spring-boot:run
```

**Frontend (with hot reload):**
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/sportviz-backend-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

## Current Data

The application currently uses **mock data** stored in-memory. The backend includes:
- 8 Cricket matches (2 live, 3 upcoming, 3 completed)
- 9 Football matches (2 live, 4 upcoming, 3 completed)

## Next Steps & Enhancements

### Backend
- [ ] Connect to real sports APIs (SportMonks, API-Football)
- [ ] Add database persistence (PostgreSQL/MySQL)
- [ ] Implement WebSocket for live updates
- [ ] Add authentication & authorization
- [ ] Create team and player endpoints
- [ ] Add statistics aggregation

### Frontend
- [ ] Real-time score updates via WebSocket
- [ ] Match detail pages
- [ ] Team profile pages
- [ ] Player statistics
- [ ] Search and filtering
- [ ] Favorite teams/matches
- [ ] Dark mode
- [ ] Mobile app (React Native)

## Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Check if port 8080 is available
- Verify Maven is installed: `mvn -version`

### Frontend won't start
- Ensure Node.js 18+ is installed: `node -version`
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

### CORS Errors
- Ensure backend is running on port 8080
- Check CORS configuration in `backend/src/main/java/com/sportviz/config/CorsConfig.java`

### No data showing
- Verify backend is running and accessible
- Check browser console for errors
- Verify API URL in frontend `.env.local`

## Contributing

Contributions are welcome! Feel free to:
- Add new features
- Fix bugs
- Improve documentation
- Enhance UI/UX

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the project repository.

---

**Built with ❤️ using Next.js and Spring Boot**
