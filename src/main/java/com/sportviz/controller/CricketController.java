package com.sportviz.controller;

import com.sportviz.model.Match;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cricket")
public class CricketController {

    private List<Match> mockMatches;

    public CricketController() {
        // Initialize mock cricket data
        mockMatches = new ArrayList<>();
        
        // Live matches
        mockMatches.add(new Match(
            "c1", "cricket", "India", "Australia",
            "live", "245/4 (45.2)", "178 (40.5)", 
            "2025-11-01T10:00:00", "Melbourne Cricket Ground"
        ));
        
        mockMatches.add(new Match(
            "c2", "cricket", "England", "South Africa",
            "live", "189/6 (32.1)", "195/5 (35.0)", 
            "2025-11-01T14:30:00", "Lord's Cricket Ground"
        ));
        
        // Upcoming matches
        mockMatches.add(new Match(
            "c3", "cricket", "Pakistan", "New Zealand",
            "upcoming", "-", "-", 
            "2025-11-02T09:00:00", "Eden Park, Auckland"
        ));
        
        mockMatches.add(new Match(
            "c4", "cricket", "West Indies", "Bangladesh",
            "upcoming", "-", "-", 
            "2025-11-02T16:00:00", "Kensington Oval, Barbados"
        ));
        
        mockMatches.add(new Match(
            "c5", "cricket", "Sri Lanka", "Afghanistan",
            "upcoming", "-", "-", 
            "2025-11-03T11:30:00", "R. Premadasa Stadium, Colombo"
        ));
        
        // Completed matches
        mockMatches.add(new Match(
            "c6", "cricket", "India", "Pakistan",
            "ft", "285/7 (50.0)", "267 (48.3)", 
            "2025-10-31T14:00:00", "Ahmedabad Stadium"
        ));
        
        mockMatches.add(new Match(
            "c7", "cricket", "Australia", "England",
            "ft", "312/9 (50.0)", "315/4 (48.2)", 
            "2025-10-30T10:30:00", "Sydney Cricket Ground"
        ));
        
        mockMatches.add(new Match(
            "c8", "cricket", "South Africa", "New Zealand",
            "ft", "198 (45.1)", "202/3 (43.5)", 
            "2025-10-29T13:00:00", "Newlands, Cape Town"
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
