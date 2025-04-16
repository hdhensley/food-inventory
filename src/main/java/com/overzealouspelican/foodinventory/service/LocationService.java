package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location findOrNew(Integer id) {
        return id == null ? 
            new Location() :
            locationRepository
                .findById(id)
                .orElseGet(Location::new);
    }

    public Location findOrFail(int id) {
        return locationRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid data"));
    }

    public Location create(Location location) {
        return locationRepository.save(location);
    }

    public Optional<Location> findById(int parentId) {
        return locationRepository.findById(parentId);
    }
}
