package com.spencer.surfhq.model;

import jakarta.persistence.*;

@Entity
@Table(name = "surf_spots")
public class SurfSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    private double latitude;
    private double longitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "avg_wave_size")
    private String avgWaveSize;
    private waveDifficulty difficulty;

    @Column(name = "description")
    private String description;

    @Column(name = "reviews")
    private String reviews;

    public enum waveDifficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }

    // No-args constructor required by JPA
    public SurfSpot() {
    }

    // All-args constructor (optional, useful for testing)
    public SurfSpot(String name, double latitude, double longitude, String avgWaveSize, waveDifficulty difficulty,
            String descriptionm, String reviews) {

        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.avgWaveSize = avgWaveSize;
        this.difficulty = difficulty;
        this.description = description;
        this.reviews = reviews;

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getAvgWaveSize() {
        return avgWaveSize;
    }

    public void setAvgWaveSize(String avgWaveSize) {
        this.avgWaveSize = avgWaveSize;
    }

    public waveDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(waveDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }
}
