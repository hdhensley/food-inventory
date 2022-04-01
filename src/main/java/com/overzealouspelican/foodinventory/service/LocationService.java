package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Location findOrNew(Integer id) {
        if(id == null){
            return new Location();
        }

        return locationRepository
                .findById(id)
                .orElseGet(Location::new);
    }

    public Location findOrFail(Integer id) {
        return locationRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid data"));
    }

    public Location create(Location location) {
        return locationRepository.save(location);
    }

    public Optional<Location> findById(Integer parentId) {
        return locationRepository.findById(parentId);
    }
}
