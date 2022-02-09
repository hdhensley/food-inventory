package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;
import com.overzealouspelican.foodinventory.repo.LocationRepository;
import com.overzealouspelican.foodinventory.request.LocationRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;

@Slf4j
@Controller
@RequestMapping(path="api/location")
public class LocationController {
    private final InventoryRepository inventoryRepository;
    private final LocationRepository locationRepository;

    public LocationController(InventoryRepository inventoryRepository, LocationRepository locationRepository) {
        this.inventoryRepository = inventoryRepository;
        this.locationRepository = locationRepository;
    }

    @PostMapping
    @ResponseBody
    public Location saveLocation(@RequestBody LocationRequest request) {
        try {
            Inventory inventory = getInventoryFromRequest(request);
            Location location = getLocationFromRequest(request);

            location.setName(request.getName());
            location.setInventory(inventory);

            locationRepository.save(location);

            return location;
        } catch (IllegalArgumentException e){
            // throw a 422

        }
        return null;
    }

    public Inventory getInventoryFromRequest(LocationRequest request) throws IllegalArgumentException {
        Optional<Inventory> _inventory = null;

        _inventory = inventoryRepository.findById(request.getInventoryId());

        if(!_inventory.isPresent()) {
            throw new IllegalArgumentException("Invalid data");
        }

        return _inventory.get();
    }

    public Location getLocationFromRequest(LocationRequest request) {
        Optional<Location> _location;

        if(request.getId() != null){
            _location = locationRepository.findById(request.getId());
        } else {
            _location = Optional.of(new Location());
        }

        return _location.get();
    }
}
