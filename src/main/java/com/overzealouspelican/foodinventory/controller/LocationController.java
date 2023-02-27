package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.request.LocationRequest;
import com.overzealouspelican.foodinventory.service.InventoryService;
import com.overzealouspelican.foodinventory.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequiredArgsConstructor
@RequestMapping(path="api/location")
public class LocationController {
    private final LocationService locationService;
    private final InventoryService inventoryService;

    @PostMapping
    @ResponseBody
    public Location saveLocation(@RequestBody LocationRequest request) {
        try {
            // @TODO validate request
            Location location = locationService.findOrNew(request.getId());

            location.setName(request.getName());
            location.setInventory(inventoryService.findOrFail(request.getInventoryId()));
            if(request.getParent() != null) {
                location.setParent(locationService.findById(request.getParent()).orElse(null));
            } else {
                location.setParent(null);
            }

            return locationService.create(location);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
