# SportViz - Quick Start Guide

Welcome to SportViz! This guide will help you get started in under 5 minutes.

## 🎯 What You'll Need

Before starting, ensure you have:
- ☕ **Java 17+** - [Download here](https://adoptium.net/)
- 📦 **Maven 3.6+** - [Download here](https://maven.apache.org/download.cgi)
- 🟢 **Node.js 18+** - [Download here](https://nodejs.org/)

## 🚀 Quick Start (3 Steps)

### Step 1: Navigate to Project
```bash
cd sportviz
```

### Step 2: Setup Frontend (One-time)
```bash
cd frontend
npm install
cp .env.local.example .env.local
cd ..
```

### Step 3: Run Both Servers

**Open Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
Wait for: `Started SportVizApplication` message

**Open Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `Ready - started server on http://localhost:3000`

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

That's it! 🎉

## 📱 Using SportViz

### Main Features:
1. **Sport Toggle** - Switch between Cricket 🏏 and Football ⚽ in the top bar
2. **Live Matches** - See real-time scores in the "Live" tab
3. **Upcoming** - Browse future fixtures
4. **Results** - Check completed match scores

### Navigation:
- **Home** - Main dashboard with all features
- **Matches** - Dedicated matches view
- **Sidebar** - Quick navigation (left side)

## 🧪 Testing the Backend API

Test if backend is working:

```bash
# Get all cricket matches
curl http://localhost:8080/api/cricket/matches

# Get live football matches
curl http://localhost:8080/api/football/matches?status=live
```

## 📊 Sample Data

The app comes with mock data:
- **Cricket**: 2 live, 3 upcoming, 3 completed matches
- **Football**: 2 live, 4 upcoming, 3 completed matches

## 🛠️ Troubleshooting

### Backend Issues
**Problem:** Port 8080 already in use
```bash
# On Linux/Mac
lsof -ti:8080 | xargs kill -9

# On Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Problem:** Maven build fails
```bash
# Clean and rebuild
cd backend
mvn clean install
```

### Frontend Issues
**Problem:** Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
# Then update backend CORS config to allow localhost:3001
```

**Problem:** Module not found errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### No Data Showing
1. ✅ Check backend is running (port 8080)
2. ✅ Check frontend is running (port 3000)
3. ✅ Open browser console (F12) and check for errors
4. ✅ Verify `.env.local` has correct API URL

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```js
colors: {
  primary: '#1e40af',    // Change this
  secondary: '#7c3aed',  // And this
}
```

### Add New Matches
Edit backend controllers:
- `backend/src/main/java/com/sportviz/controller/CricketController.java`
- `backend/src/main/java/com/sportviz/controller/FootballController.java`

## 📚 File Structure

```
sportviz/
├── backend/              # Java Spring Boot API
│   ├── src/main/java/
│   │   └── com/sportviz/
│   │       ├── controller/      # REST endpoints
│   │       ├── model/           # Data models
│   │       └── config/          # CORS setup
│   └── pom.xml
│
└── frontend/            # Next.js React App
    ├── app/            # Pages
    ├── components/     # UI components
    ├── lib/           # API calls
    └── types/         # TypeScript types
```

## 🔥 Pro Tips

1. **Auto-restart Backend**: Backend restarts automatically when you save Java files (Spring DevTools)
2. **Auto-reload Frontend**: Frontend reloads automatically on file changes (Next.js Fast Refresh)
3. **View API Data**: Install a JSON viewer browser extension for better API response viewing
4. **Use Two Monitors**: Backend in one, frontend in the other for easy debugging

## 🎓 Next Steps

Once comfortable with the basics:
1. Connect to real sports APIs (SportMonks, API-Football)
2. Add a database (PostgreSQL recommended)
3. Implement WebSocket for real-time updates
4. Add user authentication
5. Deploy to production (Frontend: Vercel, Backend: AWS/Heroku)

## 💬 Need Help?

- 📖 Check the detailed README.md
- 📁 Review backend/README.md for API details
- 📁 Review frontend/README.md for UI details
- 🐛 Check browser console for frontend errors
- 📝 Check terminal output for backend errors

## ✅ Success Checklist

- [ ] Java, Maven, Node.js installed
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3000
- [ ] Browser shows SportViz dashboard
- [ ] Can switch between Cricket and Football
- [ ] Can see matches in Live/Upcoming/Results tabs
- [ ] Match cards display team names and scores

---

**Enjoy SportViz! 🏏⚽**
