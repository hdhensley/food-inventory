package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.repo.LocationRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.Optional;

@Slf4j
@Controller
@RequestMapping(path="api/item")
public class ItemController {
    private final LocationRepository locationRepository;
    private final ItemRepository itemRepository;

    public ItemController(LocationRepository locationRepository, ItemRepository itemRepository) {
        this.locationRepository = locationRepository;
        this.itemRepository = itemRepository;
    }

    @PostMapping
    @ResponseBody
    public Item saveItem(@RequestBody ItemRequest request) {
        try {
            Location location = getLocationFromRequest(request);
            Item item = getItemFromRequest(request);

            item.setName(request.getName());
            item.setQuantity(request.getQuantity());
            item.setLocation(location);
            item.setRemovedDate(request.getRemovedDate());
            item.setDeletedDate(request.getDeletedDate());

            if(item.getDateAdded() == null) {
                item.setDateAdded(new Date());
            }

            itemRepository.save(item);

            return item;
        } catch (IllegalArgumentException e){
            // throw a 422
        }
        return null;
    }

    public Item getItemFromRequest(ItemRequest request) {
        Optional<Item> _item = null;

        if(request.getId() != null){
            _item = itemRepository.findById(request.getId());
        } else {
            _item = Optional.of(new Item());
        }

        return _item.get();
    }

    public Location getLocationFromRequest(ItemRequest request) throws IllegalArgumentException {
        Optional<Location> _location;

        _location = locationRepository.findById(request.getLocationId());

        if(!_location.isPresent()) {
            throw new IllegalArgumentException("Invalid data");
        }

        return _location.get();
    }
}
