# Cricket Data Import Guide

This guide explains how to import 5 years of historical cricket match data into SportViz.

---

## Option 1: Cricketdata.org (Historical Data - Recommended)

### Overview
- **Source**: https://cricketdata.org/
- **Data Available**: Ball-by-ball data from 2005 onwards
- **Format**: CSV, JSON
- **Cost**: FREE
- **Best for**: Historical match data (past 5 years)

### Steps to Import

#### 1. Download Historical Data

```bash
# Create data directory
mkdir -p ~/cricket-data
cd ~/cricket-data

# Download match data (2019-2024)
# Visit: https://cricketdata.org/
# Download CSV files for:
# - ODI matches (2019-2024)
# - T20I matches (2019-2024)
# - Test matches (2019-2024)

# Or use direct download links (update year as needed):
wget https://cricsheet.org/downloads/odis_json.zip
wget https://cricsheet.org/downloads/t20s_json.zip
wget https://cricsheet.org/downloads/tests_json.zip

# Unzip files
unzip odis_json.zip -d odis/
unzip t20s_json.zip -d t20s/
unzip tests_json.zip -d tests/
```

#### 2. Create Import Script

We'll create a Python script to parse and import data:

```bash
# Install Python dependencies
pip3 install psycopg2-binary pandas requests

# Create import script
nano import_cricket_data.py
```

**import_cricket_data.py**:
```python
import json
import os
import psycopg2
from datetime import datetime
from pathlib import Path

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'sportviz',
    'user': 'sportviz',
    'password': 'SportViz2024!Secure'  # Update with your password
}

def connect_db():
    return psycopg2.connect(**DB_CONFIG)

def import_match_from_json(file_path):
    """Parse cricsheet JSON and import to database"""
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Extract match info
    info = data.get('info', {})

    # Get teams
    teams = info.get('teams', [])
    if len(teams) != 2:
        return None

    team_a = teams[0]
    team_b = teams[1]

    # Get match details
    match_type = info.get('match_type', 'unknown')
    gender = info.get('gender', 'male')

    # Skip non-international or women's matches (customize as needed)
    if gender != 'male':
        return None

    # Get venue
    venue = info.get('venue', 'Unknown')
    city = info.get('city', '')

    # Get dates
    dates = info.get('dates', [])
    if not dates:
        return None
    start_date = dates[0]

    # Get outcome
    outcome = info.get('outcome', {})
    winner = outcome.get('winner')
    result = outcome.get('result', 'no result')

    # Get toss
    toss = info.get('toss', {})
    toss_winner = toss.get('winner')
    toss_decision = toss.get('decision')

    return {
        'team_a': team_a,
        'team_b': team_b,
        'format': match_type,
        'venue': venue,
        'city': city,
        'start_date': start_date,
        'winner': winner,
        'result': result,
        'toss_winner': toss_winner,
        'toss_decision': toss_decision,
        'series': info.get('event', {}).get('name', ''),
        'raw_data': json.dumps(data)
    }

def insert_match(conn, match_data):
    """Insert match into database"""
    cursor = conn.cursor()

    try:
        # Get or create team IDs
        cursor.execute(
            "INSERT INTO teams (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING id",
            (match_data['team_a'],)
        )
        cursor.execute("SELECT id FROM teams WHERE name = %s", (match_data['team_a'],))
        team_a_id = cursor.fetchone()[0]

        cursor.execute(
            "INSERT INTO teams (name) VALUES (%s) ON CONFLICT (name) DO NOTHING RETURNING id",
            (match_data['team_b'],)
        )
        cursor.execute("SELECT id FROM teams WHERE name = %s", (match_data['team_b'],))
        team_b_id = cursor.fetchone()[0]

        # Get format ID
        cursor.execute(
            "SELECT id FROM match_formats WHERE name ILIKE %s",
            (match_data['format'],)
        )
        format_result = cursor.fetchone()
        format_id = format_result[0] if format_result else 1

        # Get or create venue
        cursor.execute(
            """INSERT INTO venues (name, city) VALUES (%s, %s)
               ON CONFLICT (name, city) DO NOTHING RETURNING id""",
            (match_data['venue'], match_data['city'])
        )
        cursor.execute(
            "SELECT id FROM venues WHERE name = %s AND city = %s",
            (match_data['venue'], match_data['city'])
        )
        venue_id = cursor.fetchone()[0]

        # Get winner team ID
        winner_id = None
        if match_data['winner']:
            cursor.execute("SELECT id FROM teams WHERE name = %s", (match_data['winner'],))
            winner_result = cursor.fetchone()
            winner_id = winner_result[0] if winner_result else None

        # Insert match
        cursor.execute(
            """INSERT INTO matches (
                team_a_id, team_b_id, team_a_name, team_b_name,
                match_format_id, venue_id, venue_name,
                start_time, status, result, winner_team_id,
                series_name, match_data
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb
            ) ON CONFLICT (external_id) DO NOTHING""",
            (
                team_a_id, team_b_id, match_data['team_a'], match_data['team_b'],
                format_id, venue_id, match_data['venue'],
                match_data['start_date'], 'completed', match_data['result'],
                winner_id, match_data['series'], match_data['raw_data']
            )
        )

        conn.commit()
        return True
    except Exception as e:
        print(f"Error inserting match: {e}")
        conn.rollback()
        return False

def main():
    print("Starting cricket data import...")

    # Connect to database
    conn = connect_db()

    # Directories containing JSON files
    directories = ['odis/', 't20s/', 'tests/']

    total_imported = 0
    total_failed = 0

    for directory in directories:
        if not os.path.exists(directory):
            print(f"Directory {directory} not found, skipping...")
            continue

        print(f"\nProcessing {directory}...")
        json_files = list(Path(directory).glob('*.json'))

        for i, file_path in enumerate(json_files):
            if i % 100 == 0:
                print(f"Processed {i}/{len(json_files)} files...")

            match_data = import_match_from_json(file_path)
            if match_data:
                if insert_match(conn, match_data):
                    total_imported += 1
                else:
                    total_failed += 1

    conn.close()

    print(f"\n=== Import Complete ===")
    print(f"Total imported: {total_imported}")
    print(f"Total failed: {total_failed}")

if __name__ == "__main__":
    main()
```

#### 3. Run Import

```bash
# Run the import script
python3 import_cricket_data.py

# This will take 10-30 minutes depending on data size
```

---

## Option 2: Cricbuzz API (Real-time + Recent Matches)

### Overview
- **Source**: Cricbuzz (via RapidAPI)
- **Cost**: Free tier available (limited requests)
- **Best for**: Live matches, upcoming matches, recent completed matches

### Setup

#### 1. Get API Key

1. Go to https://rapidapi.com/cricketapilive/api/cricbuzz-cricket/
2. Sign up for free account
3. Subscribe to free tier
4. Copy your API key

#### 2. Configure Environment

```bash
# Add to .env file
RAPIDAPI_KEY=your_api_key_here
CRICBUZZ_API_URL=https://cricbuzz-cricket.p.rapidapi.com
```

#### 3. Test API

```bash
# Test with curl
curl -X GET "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent" \
  -H "X-RapidAPI-Key: your_api_key_here" \
  -H "X-RapidAPI-Host: cricbuzz-cricket.p.rapidapi.com"
```

---

## Option 3: ESPN Cricinfo API (Unofficial)

### Overview
- **Source**: ESPN Cricinfo
- **Cost**: FREE (unofficial)
- **Best for**: Historical and current match data

### Sample Endpoints

```bash
# Get recent matches
curl "https://site.web.api.espn.com/apis/site/v2/sports/cricket/11365/scoreboard"

# Get match details
curl "https://site.web.api.espn.com/apis/site/v2/sports/cricket/11365/summary?event={match_id}"

# Get teams
curl "https://site.web.api.espn.com/apis/site/v2/sports/cricket/11365/teams"
```

---

## Recommended Hybrid Approach

For the best results, use a combination:

### Phase 1: Historical Data (One-time Import)
```
Source: Cricketdata.org
Data: 2019-2024 matches (ODI, T20I, Test)
Method: Bulk import script
Time: 1-2 hours
```

### Phase 2: Recent Matches (Weekly Updates)
```
Source: Cricbuzz API or ESPN Cricinfo
Data: Last 3 months matches
Method: Automated cron job
Frequency: Weekly
```

### Phase 3: Live & Upcoming (Real-time)
```
Source: Cricbuzz API
Data: Live scores, upcoming fixtures
Method: API integration in backend
Frequency: Every 5 minutes for live matches
```

---

## Automated Data Updates

### Create Update Script

```bash
# Create update script
nano ~/update-matches.sh
```

**update-matches.sh**:
```bash
#!/bin/bash
# Update cricket matches from API

API_URL="http://localhost:8080/api/admin/update-matches"

# Call backend endpoint to fetch latest matches
curl -X POST $API_URL

echo "Match data updated: $(date)"
```

### Schedule with Cron

```bash
# Make executable
chmod +x ~/update-matches.sh

# Add to crontab
crontab -e

# Add these lines:
# Update upcoming matches daily at 6 AM
0 6 * * * ~/update-matches.sh

# Update live matches every 5 minutes (during match hours)
*/5 8-23 * * * ~/update-matches.sh
```

---

## Data Quality Checks

After importing, run these queries to verify:

```sql
-- Count matches by format
SELECT mf.name, COUNT(*)
FROM matches m
JOIN match_formats mf ON m.match_format_id = mf.id
GROUP BY mf.name;

-- Count matches by year
SELECT
    EXTRACT(YEAR FROM start_time) as year,
    COUNT(*) as total_matches
FROM matches
GROUP BY year
ORDER BY year DESC;

-- Count matches by team
SELECT team_a_name as team, COUNT(*) as matches
FROM matches
GROUP BY team_a_name
UNION
SELECT team_b_name as team, COUNT(*) as matches
FROM matches
GROUP BY team_b_name
ORDER BY matches DESC;

-- Verify data completeness
SELECT
    status,
    COUNT(*) as count
FROM matches
GROUP BY status;
```

---

## Expected Data Volume

For 5 years of international cricket:

| Format | Matches/Year | Total (5 years) |
|--------|-------------|-----------------|
| ODI    | ~150        | ~750            |
| T20I   | ~100        | ~500            |
| Test   | ~50         | ~250            |
| **Total** | **~300** | **~1,500**     |

**Database Size Estimate**: 50-100MB (with match details)

---

## Troubleshooting

### Problem: Import script fails
```bash
# Check database connection
psql -h localhost -U sportviz -d sportviz

# Check Python dependencies
pip3 install --upgrade psycopg2-binary pandas requests
```

### Problem: API rate limits
```bash
# Implement caching in backend
# Use Redis to cache API responses
# Reduce update frequency
```

### Problem: Duplicate matches
```sql
-- Find duplicates
SELECT team_a_name, team_b_name, start_time, COUNT(*)
FROM matches
GROUP BY team_a_name, team_b_name, start_time
HAVING COUNT(*) > 1;

-- Remove duplicates (keep oldest)
DELETE FROM matches a USING matches b
WHERE a.id > b.id
  AND a.team_a_name = b.team_a_name
  AND a.team_b_name = b.team_b_name
  AND a.start_time = b.start_time;
```

---

## Next Steps

1. ✅ Import historical data (2019-2024)
2. ✅ Set up automated updates
3. ✅ Integrate Cricbuzz API for live matches
4. Configure caching for better performance
5. Add match details views in frontend

**You now have a complete cricket database with 5 years of history! 🏏**
