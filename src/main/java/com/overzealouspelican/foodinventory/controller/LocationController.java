package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.request.LocationRequest;
import com.overzealouspelican.foodinventory.service.InventoryService;
import com.overzealouspelican.foodinventory.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "api/location")
public class LocationController {
    private final LocationService locationService;
    private final InventoryService inventoryService;

    public LocationController(LocationService locationService, InventoryService inventoryService) {
        this.locationService = locationService;
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public Location saveLocation(@RequestBody LocationRequest request) {
        try {
            // @TODO validate request
            Location location = locationService.findOrNew(request.id());

            location.setName(request.name());
            location.setInventory(inventoryService.findOrFail(request.inventoryId()));
            if (request.parent() != null) {
                location.setParent(locationService.findById(request.parent()).orElse(null));
            } else {
                location.setParent(null);
            }

            return locationService.create(location);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
