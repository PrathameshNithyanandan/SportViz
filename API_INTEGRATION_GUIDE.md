# SportViz API Integration Guide

## ✅ What's Been Implemented

### Cricket API Integration (LIVE with Real Data!)
- **API Provider:** CricAPI (https://www.cricapi.com/)
- **Your API Key:** `568f1434-a625-496e-994c-7b7137e18635`
- **Status:** ✅ ACTIVE with smart caching

### Features Implemented:

#### 1. **Smart Caching System**
   - API calls are limited to **100 per day** (free tier)
   - Cache refreshes every **5 minutes** for live matches
   - Automatic daily counter reset
   - Keeps 10 API calls as buffer (uses max 90/day)

#### 2. **Endpoints Created:**
   - `GET /api/cricket` - Get all cricket matches
   - `GET /api/cricket?status=live` - Get only live matches
   - `GET /api/cricket?status=upcoming` - Get upcoming matches
   - `GET /api/cricket?status=ft` - Get finished matches
   - `GET /api/cricket/stats` - Get API usage statistics

#### 3. **API Usage Dashboard**
   - Fixed bottom-right corner "📊 API Stats" button
   - Shows:
     - Calls used today (X/100)
     - Remaining calls
     - Visual progress bar (green/red)
     - Last update time
     - Number of cached matches

#### 4. **Football API (Mock Data)**
   - Currently using mock data
   - Same endpoint structure as cricket
   - Ready to integrate real API when you get the key

---

## 🎯 How It Works

### First API Call (Cold Start):
```
User visits page → API fetches from CricAPI → Data cached → Shows matches
API Calls Used: 1/100
```

### Subsequent Calls (Within 5 minutes):
```
User visits page → Serves from cache → No API call → Shows matches
API Calls Used: 1/100 (same as before!)
```

### After 5 Minutes:
```
User visits page → Checks cache → Refreshes from API → Updates cache
API Calls Used: 2/100
```

---

## 📊 API Call Strategy

| Time | API Calls | Notes |
|------|-----------|-------|
| 00:00 - 00:05 | 1 | Initial fetch |
| 00:05 - 00:10 | 2 | Refresh after 5 min |
| 00:10 - 00:15 | 3 | Refresh after 5 min |
| ... | ... | Continues every 5 min |
| 23:55 - 24:00 | ~90 | Max 90 calls per day |
| Next day 00:00 | 0 | Counter resets! |

**Maximum Usage:** 12 calls/hour × 24 hours = 288 possible calls
**Our Limit:** 90 calls/day (to stay within free tier)

---

## 🚀 Next Steps

### For Football Integration:
You need to get a FREE API key from one of these:

#### Option 1: Football-Data.org (Recommended)
1. Go to https://www.football-data.org/client/register
2. Sign up (free)
3. Get your API token
4. **Give me the token** and I'll integrate it (same caching system)
5. Free tier: 10 requests/minute, unlimited daily

#### Option 2: API-Football (RapidAPI)
1. Go to https://rapidapi.com/
2. Search for "API-Football"
3. Subscribe to free tier (100 requests/day)
4. **Give me the RapidAPI key**

---

## 📁 Files Created/Modified

### New Files:
- `app/services/cricketApi.ts` - Cricket API service with caching
- `app/api/cricket/route.ts` - Cricket API endpoint
- `app/api/cricket/stats/route.ts` - API stats endpoint
- `app/api/football/route.ts` - Football API endpoint (mock data)
- `app/components/ApiStats.tsx` - API usage dashboard component
- `API_INTEGRATION_GUIDE.md` - This file

### Modified Files:
- `app/lib/api.ts` - Updated to use new API routes
- `app/layout.tsx` - Added ApiStats component
- `app/components/Sidebar.tsx` - Added hamburger menu (always visible)

---

## 🧪 Testing

Visit your app at `http://localhost:3000`:

1. **Check Hamburger Menu:** Click the hamburger button in top-left
2. **View Cricket Matches:** Navigate to "Cricket Matches"
3. **Check API Stats:** Click "📊 API Stats" button (bottom-right)
4. **Watch the Counter:** Refresh page and see if cached data is used

---

## 💾 Data Persistence

Currently data is cached **in memory** (lost on server restart).

### To Make It Permanent:
I can set up one of these:

1. **JSON File Cache** (Easiest, no setup)
   - Saves to `data/cache.json`
   - Persists between restarts
   - No database needed

2. **SQLite Database** (Better)
   - Local file-based database
   - Better query performance
   - No external service needed

3. **PostgreSQL** (Best, but requires setup)
   - Use the existing `init-db.sql` schema
   - Can store years of historical data
   - Best for production

**Which would you prefer?** I can implement any of these in 5 minutes!

---

## 🎉 Summary

✅ Cricket API is LIVE with your API key
✅ Smart caching prevents wasting API calls
✅ API usage dashboard shows real-time stats
✅ Hamburger menu works on all devices
✅ Football ready for API integration

**Current Status:** Fetching REAL cricket match data from CricAPI!

---

## 📞 What I Need From You

1. **Football API Key** (optional, can add later)
   - Which provider do you want? (Football-Data.org or API-Football)

2. **Cache Persistence Preference**
   - JSON File? SQLite? PostgreSQL?

3. **Test the App**
   - Check if cricket matches are loading
   - Check the API stats counter
   - Let me know if you see any errors!

Enjoy your real-time sports data! 🏏⚽
