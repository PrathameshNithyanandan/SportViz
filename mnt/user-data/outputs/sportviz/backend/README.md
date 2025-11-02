# SportViz Backend

Spring Boot REST API for SportViz sports dashboard.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Project Structure

```
backend/
├── src/main/java/com/sportviz/
│   ├── SportVizApplication.java      # Main Spring Boot application
│   ├── config/
│   │   └── CorsConfig.java           # CORS configuration
│   ├── controller/
│   │   ├── CricketController.java    # Cricket API endpoints
│   │   └── FootballController.java   # Football API endpoints
│   └── model/
│       └── Match.java                # Match data model
├── src/main/resources/
│   └── application.properties        # Application configuration
└── pom.xml                           # Maven dependencies
```

## Running the Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Run with Maven:**
   ```bash
   mvn spring-boot:run
   ```

3. **Or build and run:**
   ```bash
   mvn clean package
   java -jar target/sportviz-backend-1.0.0.jar
   ```

The server will start on `http://localhost:8080`

## API Endpoints

### Cricket

- **GET** `/api/cricket/matches` - Get all cricket matches
- **GET** `/api/cricket/matches?status=live` - Get live matches
- **GET** `/api/cricket/matches?status=upcoming` - Get upcoming matches
- **GET** `/api/cricket/matches?status=ft` - Get finished matches
- **GET** `/api/cricket/matches/{id}` - Get specific match by ID

### Football

- **GET** `/api/football/matches` - Get all football matches
- **GET** `/api/football/matches?status=live` - Get live matches
- **GET** `/api/football/matches?status=upcoming` - Get upcoming matches
- **GET** `/api/football/matches?status=ft` - Get finished matches
- **GET** `/api/football/matches/{id}` - Get specific match by ID

## Response Format

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

## Testing the API

Using curl:
```bash
# Get all cricket matches
curl http://localhost:8080/api/cricket/matches

# Get live football matches
curl http://localhost:8080/api/football/matches?status=live
```

## CORS Configuration

CORS is enabled for:
- `http://localhost:3000` (Next.js default)
- `http://localhost:3001` (alternative port)

## Next Steps

- Connect to real sports APIs (SportMonks, API-Football)
- Add database persistence (PostgreSQL/MySQL)
- Implement authentication
- Add WebSocket support for live score updates
