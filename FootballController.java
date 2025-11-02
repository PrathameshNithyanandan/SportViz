package com.sportviz.controller;

import com.sportviz.model.Match;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/football")
public class FootballController {

    private List<Match> mockMatches;

    public FootballController() {
        // Initialize mock football data
        mockMatches = new ArrayList<>();
        
        // Live matches
        mockMatches.add(new Match(
            "f1", "football", "Manchester United", "Liverpool",
            "live", "2", "1", 
            "2025-11-01T15:00:00", "Old Trafford"
        ));
        
        mockMatches.add(new Match(
            "f2", "football", "Barcelona", "Real Madrid",
            "live", "1", "1", 
            "2025-11-01T20:00:00", "Camp Nou"
        ));
        
        // Upcoming matches
        mockMatches.add(new Match(
            "f3", "football", "Chelsea", "Arsenal",
            "upcoming", "-", "-", 
            "2025-11-02T17:30:00", "Stamford Bridge"
        ));
        
        mockMatches.add(new Match(
            "f4", "football", "Bayern Munich", "Borussia Dortmund",
            "upcoming", "-", "-", 
            "2025-11-02T19:30:00", "Allianz Arena"
        ));
        
        mockMatches.add(new Match(
            "f5", "football", "PSG", "Marseille",
            "upcoming", "-", "-", 
            "2025-11-03T20:45:00", "Parc des Princes"
        ));
        
        mockMatches.add(new Match(
            "f6", "football", "Inter Milan", "AC Milan",
            "upcoming", "-", "-", 
            "2025-11-03T18:00:00", "San Siro"
        ));
        
        // Completed matches
        mockMatches.add(new Match(
            "f7", "football", "Manchester City", "Tottenham",
            "ft", "3", "2", 
            "2025-10-31T16:30:00", "Etihad Stadium"
        ));
        
        mockMatches.add(new Match(
            "f8", "football", "Juventus", "Napoli",
            "ft", "1", "1", 
            "2025-10-30T20:00:00", "Juventus Stadium"
        ));
        
        mockMatches.add(new Match(
            "f9", "football", "Atletico Madrid", "Sevilla",
            "ft", "2", "0", 
            "2025-10-29T21:00:00", "Wanda Metropolitano"
        ));
    }

    @GetMapping("/matches")
    public List<Match> getAllMatches(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return mockMatches.stream()
                    .filter(match -> match.getStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }
        return mockMatches;
    }

    @GetMapping("/matches/{id}")
    public Match getMatchById(@PathVariable String id) {
        return mockMatches.stream()
                .filter(match -> match.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
