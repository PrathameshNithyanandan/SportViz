package com.sportviz.model;

public class Match {
    private String id;
    private String sport; // cricket or football
    private String teamA;
    private String teamB;
    private String status; // live, upcoming, ft (full-time)
    private String scoreA;
    private String scoreB;
    private String startTime;
    private String venue;

    // Constructors
    public Match() {}

    public Match(String id, String sport, String teamA, String teamB, 
                 String status, String scoreA, String scoreB, String startTime, String venue) {
        this.id = id;
        this.sport = sport;
        this.teamA = teamA;
        this.teamB = teamB;
        this.status = status;
        this.scoreA = scoreA;
        this.scoreB = scoreB;
        this.startTime = startTime;
        this.venue = venue;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getTeamA() {
        return teamA;
    }

    public void setTeamA(String teamA) {
        this.teamA = teamA;
    }

    public String getTeamB() {
        return teamB;
    }

    public void setTeamB(String teamB) {
        this.teamB = teamB;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getScoreA() {
        return scoreA;
    }

    public void setScoreA(String scoreA) {
        this.scoreA = scoreA;
    }

    public String getScoreB() {
        return scoreB;
    }

    public void setScoreB(String scoreB) {
        this.scoreB = scoreB;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }
}
