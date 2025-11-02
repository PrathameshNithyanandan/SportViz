-- SportViz Database Schema
-- Optimized for storing 5 years of international cricket match data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Teams Table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    short_name VARCHAR(10),
    country VARCHAR(100),
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on team name for faster lookups
CREATE INDEX idx_teams_name ON teams(name);

-- Match Types/Formats
CREATE TABLE IF NOT EXISTS match_formats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- Test, ODI, T20I, T10
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default match formats
INSERT INTO match_formats (name, description) VALUES
    ('Test', 'Test Match - 5 days'),
    ('ODI', 'One Day International - 50 overs'),
    ('T20I', 'Twenty20 International - 20 overs'),
    ('T10', 'T10 International - 10 overs')
ON CONFLICT (name) DO NOTHING;

-- Venues Table
CREATE TABLE IF NOT EXISTS venues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    capacity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, city)
);

CREATE INDEX idx_venues_country ON venues(country);

-- Matches Table (Main table)
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id VARCHAR(100) UNIQUE, -- ID from cricket API

    -- Teams
    team_a_id INTEGER REFERENCES teams(id),
    team_b_id INTEGER REFERENCES teams(id),
    team_a_name VARCHAR(100) NOT NULL, -- Denormalized for faster queries
    team_b_name VARCHAR(100) NOT NULL,

    -- Match Details
    match_format_id INTEGER REFERENCES match_formats(id),
    match_type VARCHAR(50), -- International, Domestic, etc.
    series_name VARCHAR(200),
    match_number INTEGER,

    -- Venue
    venue_id INTEGER REFERENCES venues(id),
    venue_name VARCHAR(200), -- Denormalized

    -- Timing
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,

    -- Status
    status VARCHAR(20) NOT NULL, -- live, upcoming, completed, cancelled
    result VARCHAR(500), -- Match result description
    winner_team_id INTEGER REFERENCES teams(id),

    -- Toss
    toss_winner_id INTEGER REFERENCES teams(id),
    toss_decision VARCHAR(20), -- bat, bowl

    -- Match Data
    match_data JSONB, -- Store detailed match data (innings, overs, etc.)

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CHECK (team_a_id != team_b_id),
    CHECK (status IN ('live', 'upcoming', 'completed', 'cancelled', 'abandoned'))
);

-- Indexes for matches table (critical for performance)
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_start_time ON matches(start_time DESC);
CREATE INDEX idx_matches_team_a ON matches(team_a_id);
CREATE INDEX idx_matches_team_b ON matches(team_b_id);
CREATE INDEX idx_matches_format ON matches(match_format_id);
CREATE INDEX idx_matches_external_id ON matches(external_id);
CREATE INDEX idx_matches_status_start_time ON matches(status, start_time DESC);

-- GIN index for JSONB match_data (for querying within JSON)
CREATE INDEX idx_matches_match_data ON matches USING GIN(match_data);

-- Match Scores Table (for quick score lookup)
CREATE TABLE IF NOT EXISTS match_scores (
    id SERIAL PRIMARY KEY,
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    team_id INTEGER REFERENCES teams(id),
    innings_number INTEGER NOT NULL,
    runs INTEGER,
    wickets INTEGER,
    overs DECIMAL(5,1),
    extras INTEGER,
    score_text VARCHAR(50), -- e.g., "245/4 (45.2)"
    is_declared BOOLEAN DEFAULT FALSE,
    is_all_out BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(match_id, team_id, innings_number)
);

CREATE INDEX idx_match_scores_match ON match_scores(match_id);

-- Players Table (optional, for future use)
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(100) UNIQUE,
    name VARCHAR(200) NOT NULL,
    team_id INTEGER REFERENCES teams(id),
    role VARCHAR(50), -- Batsman, Bowler, All-rounder, Wicket-keeper
    batting_style VARCHAR(50),
    bowling_style VARCHAR(50),
    country VARCHAR(100),
    date_of_birth DATE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_players_team ON players(team_id);
CREATE INDEX idx_players_name ON players(name);

-- Match Players Table (many-to-many)
CREATE TABLE IF NOT EXISTS match_players (
    id SERIAL PRIMARY KEY,
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id),
    team_id INTEGER REFERENCES teams(id),
    is_playing_eleven BOOLEAN DEFAULT TRUE,
    is_substitute BOOLEAN DEFAULT FALSE,

    UNIQUE(match_id, player_id)
);

CREATE INDEX idx_match_players_match ON match_players(match_id);
CREATE INDEX idx_match_players_player ON match_players(player_id);

-- Series Table
CREATE TABLE IF NOT EXISTS series (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    start_date DATE,
    end_date DATE,
    format_id INTEGER REFERENCES match_formats(id),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(name, start_date)
);

-- API Cache Table (for caching external API responses)
CREATE TABLE IF NOT EXISTS api_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(500) NOT NULL UNIQUE,
    cache_value JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_cache_key ON api_cache(cache_key);
CREATE INDEX idx_api_cache_expires ON api_cache(expires_at);

-- Data Import Log (track data imports)
CREATE TABLE IF NOT EXISTS data_import_log (
    id SERIAL PRIMARY KEY,
    source VARCHAR(100) NOT NULL, -- cricbuzz, cricapi, etc.
    import_type VARCHAR(50) NOT NULL, -- historical, live, upcoming
    records_imported INTEGER DEFAULT 0,
    records_failed INTEGER DEFAULT 0,
    status VARCHAR(20) NOT NULL, -- success, failed, partial
    error_message TEXT,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_import_log_source ON data_import_log(source);
CREATE INDEX idx_import_log_status ON data_import_log(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some default teams (Top cricket nations)
INSERT INTO teams (name, short_name, country) VALUES
    ('India', 'IND', 'India'),
    ('Australia', 'AUS', 'Australia'),
    ('England', 'ENG', 'England'),
    ('Pakistan', 'PAK', 'Pakistan'),
    ('New Zealand', 'NZ', 'New Zealand'),
    ('South Africa', 'SA', 'South Africa'),
    ('West Indies', 'WI', 'West Indies'),
    ('Bangladesh', 'BAN', 'Bangladesh'),
    ('Sri Lanka', 'SL', 'Sri Lanka'),
    ('Afghanistan', 'AFG', 'Afghanistan'),
    ('Ireland', 'IRE', 'Ireland'),
    ('Zimbabwe', 'ZIM', 'Zimbabwe')
ON CONFLICT (name) DO NOTHING;

-- Create view for upcoming matches
CREATE OR REPLACE VIEW upcoming_matches AS
SELECT
    m.id,
    m.external_id,
    m.team_a_name,
    m.team_b_name,
    mf.name as format,
    m.venue_name,
    m.start_time,
    m.series_name,
    m.status
FROM matches m
LEFT JOIN match_formats mf ON m.match_format_id = mf.id
WHERE m.status = 'upcoming'
  AND m.start_time > CURRENT_TIMESTAMP
ORDER BY m.start_time ASC;

-- Create view for live matches
CREATE OR REPLACE VIEW live_matches AS
SELECT
    m.id,
    m.external_id,
    m.team_a_name,
    m.team_b_name,
    mf.name as format,
    m.venue_name,
    m.start_time,
    m.series_name,
    m.status,
    (
        SELECT json_agg(json_build_object(
            'team_id', ms.team_id,
            'score_text', ms.score_text,
            'runs', ms.runs,
            'wickets', ms.wickets,
            'overs', ms.overs
        ))
        FROM match_scores ms
        WHERE ms.match_id = m.id
    ) as scores
FROM matches m
LEFT JOIN match_formats mf ON m.match_format_id = mf.id
WHERE m.status = 'live'
ORDER BY m.start_time DESC;

-- Create view for recent completed matches
CREATE OR REPLACE VIEW recent_completed_matches AS
SELECT
    m.id,
    m.external_id,
    m.team_a_name,
    m.team_b_name,
    mf.name as format,
    m.venue_name,
    m.start_time,
    m.end_time,
    m.series_name,
    m.result,
    tw.name as winner_team,
    m.status
FROM matches m
LEFT JOIN match_formats mf ON m.match_format_id = mf.id
LEFT JOIN teams tw ON m.winner_team_id = tw.id
WHERE m.status = 'completed'
ORDER BY m.start_time DESC
LIMIT 100;

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sportviz;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sportviz;
