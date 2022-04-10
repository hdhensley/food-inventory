package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.request.ItemRequest;
import com.overzealouspelican.foodinventory.service.ItemService;
import com.overzealouspelican.foodinventory.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(path="api/item")
public class ItemController {
    private final LocationService locationService;
    private final ItemService itemService;

    @PostMapping
    @ResponseBody
    public Item saveItem(@RequestBody ItemRequest request) {
        try {
            Item item = itemService.findOrNew(request);

            item.setBrand(request.getBrand());
            item.setName(request.getName());
            item.setQuantity(request.getQuantity());
            item.setLocation(locationService.findOrFail(request.getLocationId()));
            item.setRemovedDate(request.getRemovedDate());
            item.setDeletedDate(request.getDeletedDate());

            if(item.getDateAdded() == null) {
                item.setDateAdded(new Date());
            }

            return itemService.save(item);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
