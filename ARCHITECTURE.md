# SportViz Architecture

## System Overview

SportViz is a full-stack web application with a clear separation between frontend and backend.

```
┌─────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                       │
│                     (http://localhost:3000)                  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  App Router (Pages)                                     │ │
│  │  - Home Page (/)                                        │ │
│  │  - Matches Page (/matches)                              │ │
│  │  - Teams, Players, Stats (placeholders)                 │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Components                                             │ │
│  │  - TopBar (Sport Selector)                              │ │
│  │  - Sidebar (Navigation)                                 │ │
│  │  - MatchCard (Match Display)                            │ │
│  │  - MatchesTab (Live/Upcoming/Results)                   │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  API Client (lib/api.ts)                                │ │
│  │  - fetchMatches()                                       │ │
│  │  - fetchMatchById()                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ REST API Calls
                            │ (fetch)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   BACKEND (Spring Boot)                      │
│                  (http://localhost:8080)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  REST Controllers (@RestController)                     │ │
│  │  ┌──────────────────┐  ┌──────────────────┐            │ │
│  │  │ CricketController│  │FootballController│            │ │
│  │  │                  │  │                  │            │ │
│  │  │ GET /api/cricket/│  │ GET /api/football/│           │ │
│  │  │     matches      │  │     matches      │            │ │
│  │  │ GET /api/cricket/│  │ GET /api/football/│           │ │
│  │  │     matches/{id} │  │     matches/{id} │            │ │
│  │  └──────────────────┘  └──────────────────┘            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Data Model                                             │ │
│  │  - Match.java (POJO)                                    │ │
│  │    • id, sport, teamA, teamB                            │ │
│  │    • status, scoreA, scoreB                             │ │
│  │    • startTime, venue                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Configuration                                          │ │
│  │  - CorsConfig (CORS for localhost:3000)                 │ │
│  │  - application.properties                               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Data Storage (Current)                                 │ │
│  │  - In-Memory Mock Data (List<Match>)                    │ │
│  │  - 8 Cricket matches                                    │ │
│  │  - 9 Football matches                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Interaction Flow
```
User clicks "Cricket" 
    → TopBar updates selectedSport state
    → MatchesTab receives new sport prop
    → useEffect triggers
    → fetchMatches('cricket', 'live') called
    → HTTP GET to /api/cricket/matches?status=live
    → Backend returns JSON array
    → State updates with new data
    → MatchCard components re-render with cricket data
```

### 2. Match Fetching Flow
```
Frontend (api.ts)                Backend (Controller)
     │                                  │
     │  GET /api/cricket/matches        │
     ├──────────────────────────────────>│
     │                                  │ Filter by status
     │                                  │ Return List<Match>
     │  JSON Response                   │
     │<──────────────────────────────────┤
     │                                  │
  Parse JSON                            │
  Update State                          │
  Render UI                             │
```

## Component Hierarchy

```
RootLayout
├── Sidebar (Navigation)
│   ├── Home Link
│   ├── Matches Link
│   ├── Teams Link
│   ├── Players Link
│   └── Stats Link
│
└── Page (Main Content)
    ├── TopBar
    │   ├── Logo
    │   └── Sport Selector (Cricket/Football)
    │
    └── MatchesTab
        ├── Tab Navigation (Live/Upcoming/Results)
        │
        └── Match Grid
            ├── MatchCard (Match 1)
            ├── MatchCard (Match 2)
            ├── MatchCard (Match 3)
            └── ...
```

## API Endpoints Structure

```
Backend Base URL: http://localhost:8080

Cricket Endpoints:
├── GET /api/cricket/matches
│   ├── ?status=live       → Live matches only
│   ├── ?status=upcoming   → Upcoming matches only
│   └── ?status=ft         → Finished matches only
└── GET /api/cricket/matches/{id}  → Specific match

Football Endpoints:
├── GET /api/football/matches
│   ├── ?status=live       → Live matches only
│   ├── ?status=upcoming   → Upcoming matches only
│   └── ?status=ft         → Finished matches only
└── GET /api/football/matches/{id}  → Specific match
```

## Technology Stack Details

### Frontend Stack
```
Next.js 14 (App Router)
├── React 18 (UI Library)
├── TypeScript (Type Safety)
├── Tailwind CSS (Styling)
└── Node.js 18+ (Runtime)
```

### Backend Stack
```
Spring Boot 3.2
├── Spring Web (REST API)
├── Java 17+ (Programming Language)
├── Maven (Build Tool)
└── Tomcat (Embedded Server)
```

## Request/Response Cycle

### Example: Fetching Live Cricket Matches

**1. Frontend Request:**
```typescript
// lib/api.ts
const response = await fetch(
  'http://localhost:8080/api/cricket/matches?status=live',
  { cache: 'no-store' }
);
const matches = await response.json();
```

**2. Backend Processing:**
```java
// CricketController.java
@GetMapping("/matches")
public List<Match> getAllMatches(@RequestParam String status) {
    return mockMatches.stream()
        .filter(match -> match.getStatus().equalsIgnoreCase(status))
        .collect(Collectors.toList());
}
```

**3. Response Format:**
```json
[
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
]
```

**4. Frontend Rendering:**
```typescript
// MatchCard.tsx renders each match
<div className="match-card">
  <StatusBadge status="live" />
  <TeamScore team="India" score="245/4 (45.2)" />
  <TeamScore team="Australia" score="178 (40.5)" />
  <Venue name="Melbourne Cricket Ground" />
</div>
```

## State Management

### Frontend State Flow
```
┌─────────────────────────────────────┐
│  Page Component                      │
│  - selectedSport: 'cricket'/'football'│
│  (Sport selector state)              │
└─────────────┬───────────────────────┘
              │ Props
              ▼
┌─────────────────────────────────────┐
│  MatchesTab Component                │
│  - activeTab: 'live'/'upcoming'/'ft' │
│  - matches: Match[]                  │
│  - loading: boolean                  │
└─────────────┬───────────────────────┘
              │ Props
              ▼
┌─────────────────────────────────────┐
│  MatchCard Component                 │
│  - match: Match (single match data)  │
└─────────────────────────────────────┘
```

## CORS Configuration

```
Frontend Origin: http://localhost:3000
                      │
                      │ Allowed by CORS
                      ▼
Backend: http://localhost:8080
         CorsConfig.java allows:
         - localhost:3000
         - localhost:3001
         Methods: GET, POST, PUT, DELETE, OPTIONS
```

## Future Architecture (With Database)

```
┌──────────────┐
│   Frontend   │
│  (Next.js)   │
└──────┬───────┘
       │ REST API
       ▼
┌──────────────┐      ┌──────────────┐
│   Backend    │◄────►│   Database   │
│(Spring Boot) │ JPA  │ (PostgreSQL) │
└──────┬───────┘      └──────────────┘
       │
       ▼
┌──────────────┐
│External APIs │
│ (SportMonks) │
│(API-Football)│
└──────────────┘
```

## Scalability Considerations

### Current (MVP)
- Single server deployment
- In-memory data storage
- Synchronous API calls
- No caching

### Production Ready
- Load-balanced frontend (CDN)
- Clustered backend instances
- Database with connection pooling
- Redis caching layer
- WebSocket for live updates
- API rate limiting
- Monitoring and logging

## Development Workflow

```
Code Changes
     │
     ├─ Frontend Changes (*.tsx, *.ts)
     │  └─ Next.js Hot Reload (< 1s)
     │
     └─ Backend Changes (*.java)
        └─ Spring DevTools Restart (2-5s)
```

## Port Configuration

| Service  | Port | Configurable Via |
|----------|------|------------------|
| Backend  | 8080 | application.properties |
| Frontend | 3000 | npm run dev -- -p <port> |

## Security Notes

### Current Implementation
- ✅ CORS enabled for localhost only
- ✅ TypeScript for type safety
- ❌ No authentication
- ❌ No rate limiting
- ❌ No input validation

### Production Recommendations
- Add JWT authentication
- Implement rate limiting
- Add input validation
- Use HTTPS
- Implement API versioning
- Add request logging

---

This architecture provides a solid foundation for a sports dashboard application with clear separation of concerns and room for future enhancements.
