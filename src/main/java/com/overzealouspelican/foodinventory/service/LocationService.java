package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.LocationRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    /**
     * Finds a location by id, or returns a new location if the id is null.
     * @param id If null, a new location is created.
     * @return A location object, either found or newly created.
     */
    public Location findOrNew(Integer id) {
        return id == null ? 
            new Location() :
            locationRepository
                .findById(id)
                .orElseGet(Location::new);
    }

    /**
     * Finds a location by id, or throws an exception if not found.
     * @param id The id of the location to find.
     * @return The location object if found.
     * @throws IllegalArgumentException if the location is not found.
     */
    public Location findOrFail(int id) {
        return locationRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid data"));
    }

    /**
     * Creates a new location or updates an existing one.
     * @param location The location object to save.
     * @return The saved location object.
     */
    public Location create(Location location) {
        return locationRepository.save(location);
    }

    /**
     * Finds a location by id.
     * @param parentId The id of the location to find.
     * @return An Optional containing the location if found, or empty if not found.
     */
    public Optional<Location> findById(int parentId) {
        return locationRepository.findById(parentId);
    }
}
