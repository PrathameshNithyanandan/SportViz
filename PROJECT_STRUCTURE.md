# SportViz - Complete Project Structure

```
sportviz/
│
├── 📄 README.md                    # Main project documentation
├── 📄 QUICKSTART.md                # Quick start guide (5 min setup)
├── 📄 ARCHITECTURE.md              # System architecture details
├── 📄 setup.sh                     # Automated setup script
│
├── 📁 backend/                     # Java Spring Boot Backend
│   ├── 📄 README.md                # Backend documentation
│   ├── 📄 .gitignore               # Git ignore rules
│   ├── 📄 pom.xml                  # Maven dependencies & config
│   │
│   └── 📁 src/main/
│       ├── 📁 java/com/sportviz/
│       │   │
│       │   ├── 📄 SportVizApplication.java      # Spring Boot main class
│       │   │
│       │   ├── 📁 config/
│       │   │   └── 📄 CorsConfig.java           # CORS configuration
│       │   │
│       │   ├── 📁 controller/
│       │   │   ├── 📄 CricketController.java    # Cricket REST endpoints
│       │   │   └── 📄 FootballController.java   # Football REST endpoints
│       │   │
│       │   └── 📁 model/
│       │       └── 📄 Match.java                # Match data model (POJO)
│       │
│       └── 📁 resources/
│           └── 📄 application.properties        # App configuration
│
└── 📁 frontend/                    # Next.js React Frontend
    ├── 📄 README.md                # Frontend documentation
    ├── 📄 .gitignore               # Git ignore rules
    ├── 📄 package.json             # npm dependencies
    ├── 📄 tsconfig.json            # TypeScript configuration
    ├── 📄 next.config.js           # Next.js configuration
    ├── 📄 tailwind.config.js       # Tailwind CSS configuration
    ├── 📄 postcss.config.js        # PostCSS configuration
    ├── 📄 .env.local.example       # Environment variables template
    │
    ├── 📁 app/                     # Next.js App Router (Pages)
    │   ├── 📄 layout.tsx           # Root layout (includes Sidebar)
    │   ├── 📄 page.tsx             # Home page (main dashboard)
    │   ├── 📄 globals.css          # Global CSS with Tailwind
    │   │
    │   ├── 📁 matches/
    │   │   └── 📄 page.tsx         # Matches page
    │   │
    │   ├── 📁 teams/
    │   │   └── 📄 page.tsx         # Teams page (placeholder)
    │   │
    │   ├── 📁 players/
    │   │   └── 📄 page.tsx         # Players page (placeholder)
    │   │
    │   └── 📁 stats/
    │       └── 📄 page.tsx         # Stats page (placeholder)
    │
    ├── 📁 components/              # React Components
    │   ├── 📄 TopBar.tsx           # Header with logo & sport selector
    │   ├── 📄 Sidebar.tsx          # Navigation sidebar
    │   ├── 📄 MatchCard.tsx        # Individual match card display
    │   └── 📄 MatchesTab.tsx       # Tabbed view (Live/Upcoming/Results)
    │
    ├── 📁 lib/                     # Utilities
    │   └── 📄 api.ts               # API client functions
    │
    ├── 📁 types/                   # TypeScript Type Definitions
    │   └── 📄 match.ts             # Match interface & types
    │
    └── 📁 public/                  # Static assets (empty for now)
```

## File Counts

### Backend
- **Java Files**: 5
  - 1 Main Application
  - 1 Configuration
  - 2 Controllers
  - 1 Model
- **Config Files**: 2 (pom.xml, application.properties)
- **Total Backend Files**: ~7

### Frontend
- **TypeScript/React Files**: 13
  - 6 Pages (layout + home + 4 routes)
  - 4 Components
  - 1 API utility
  - 1 Type definition
  - 1 Global CSS
- **Config Files**: 5 (package.json, tsconfig, next.config, tailwind, postcss)
- **Total Frontend Files**: ~19

### Documentation
- **Markdown Files**: 5
  - README.md (main)
  - QUICKSTART.md
  - ARCHITECTURE.md
  - backend/README.md
  - frontend/README.md

## Lines of Code (Approximate)

| Category | Files | Lines |
|----------|-------|-------|
| Java Backend | 5 | ~400 |
| TypeScript/React | 13 | ~800 |
| Configuration | 7 | ~150 |
| Documentation | 5 | ~1500 |
| **Total** | **30** | **~2850** |

## Key Files Explained

### Backend Files

| File | Purpose | Lines |
|------|---------|-------|
| `SportVizApplication.java` | Spring Boot entry point | ~15 |
| `CorsConfig.java` | Enable frontend access | ~25 |
| `CricketController.java` | Cricket API endpoints | ~90 |
| `FootballController.java` | Football API endpoints | ~100 |
| `Match.java` | Data model with getters/setters | ~100 |
| `pom.xml` | Maven dependencies | ~60 |
| `application.properties` | Server configuration | ~6 |

### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| `layout.tsx` | Root layout wrapper | ~25 |
| `page.tsx` | Home page | ~35 |
| `TopBar.tsx` | Header component | ~50 |
| `Sidebar.tsx` | Navigation menu | ~45 |
| `MatchCard.tsx` | Match display card | ~80 |
| `MatchesTab.tsx` | Tab switching logic | ~90 |
| `api.ts` | Backend API calls | ~40 |
| `match.ts` | TypeScript interfaces | ~10 |

## Build Artifacts (Generated)

### Backend (after `mvn package`)
```
backend/target/
├── classes/                        # Compiled .class files
├── sportviz-backend-1.0.0.jar     # Executable JAR (~20 MB)
└── ...                            # Maven build files
```

### Frontend (after `npm run build`)
```
frontend/.next/
├── cache/                          # Build cache
├── server/                         # Server-side bundles
├── static/                         # Static assets
└── ...                            # Next.js build artifacts
```

### Frontend (after `npm install`)
```
frontend/node_modules/              # ~400 MB, ~20,000 files
├── next/                          # Next.js framework
├── react/                         # React library
├── tailwindcss/                   # Tailwind CSS
└── ...                            # All dependencies
```

## Deployment Files (Not Included)

For production deployment, you would add:
```
├── .github/workflows/              # CI/CD pipelines
│   └── deploy.yml
├── Dockerfile                      # Backend container
├── frontend/Dockerfile             # Frontend container
├── docker-compose.yml              # Multi-container setup
└── kubernetes/                     # K8s manifests (if needed)
    ├── backend-deployment.yaml
    ├── frontend-deployment.yaml
    └── service.yaml
```

## Development Workflow Files

### Backend Development
```
backend/
├── .mvn/                          # Maven wrapper (optional)
├── mvnw                           # Maven wrapper script (Unix)
├── mvnw.cmd                       # Maven wrapper script (Windows)
└── target/                        # Build output (gitignored)
```

### Frontend Development
```
frontend/
├── node_modules/                  # Dependencies (gitignored)
├── .next/                         # Build cache (gitignored)
├── .env.local                     # Local env vars (gitignored)
└── package-lock.json              # Locked dependencies
```

## Configuration Files Deep Dive

### Backend Configuration Chain
```
pom.xml
   └── Defines: Spring Boot 3.2, Java 17
       └── application.properties
           └── Sets: server.port=8080
               └── CorsConfig.java
                   └── Allows: localhost:3000
```

### Frontend Configuration Chain
```
package.json
   └── Defines: Next.js 14, React 18, TypeScript
       └── tsconfig.json
           └── TypeScript rules & paths
               └── tailwind.config.js
                   └── Styling configuration
                       └── next.config.js
                           └── Next.js features & build
```

## Data Flow Through Files

### User Clicks "Cricket" Button
```
1. app/page.tsx
   └── TopBar.tsx (Sport selector clicked)
       └── State: selectedSport = 'cricket'
           └── MatchesTab.tsx (receives sport='cricket')
               └── lib/api.ts → fetchMatches('cricket', 'live')
                   └── HTTP GET to backend
                       └── controller/CricketController.java
                           └── Returns: List<Match>
                               └── model/Match.java (data structure)
                                   └── Back to MatchesTab
                                       └── MatchCard.tsx (renders each match)
```

## File Relationships

### Strong Dependencies
- `page.tsx` → `TopBar.tsx` + `MatchesTab.tsx`
- `MatchesTab.tsx` → `MatchCard.tsx` + `api.ts`
- `api.ts` → `match.ts` (types)
- `CricketController.java` → `Match.java`
- `FootballController.java` → `Match.java`

### Configuration Dependencies
- `app/layout.tsx` → `globals.css` → `tailwind.config.js`
- `SportVizApplication.java` → `application.properties`
- All components → `tsconfig.json`

## Size Analysis

| Category | Size (approx) |
|----------|---------------|
| Source code (backend) | 50 KB |
| Source code (frontend) | 100 KB |
| Documentation | 50 KB |
| Config files | 20 KB |
| **Total Source** | **220 KB** |
| Backend JAR (built) | 20 MB |
| Frontend build | 5 MB |
| node_modules | 400 MB |

## Recommended IDE Setup

### Backend (IntelliJ IDEA or Eclipse)
```
Open: backend/pom.xml
Maven auto-import will set up project
Run: SportVizApplication.java
```

### Frontend (VS Code)
```
Open: frontend/ folder
Extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Hero
Run: npm run dev in integrated terminal
```

---

**This structure provides a clean, maintainable codebase that's easy to navigate and extend.**
