package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ItemService {
    public final ItemRepository itemRepository;
    public final LocationService locationService;

    public ItemService(ItemRepository itemRepo, LocationService locationService) {
        this.itemRepository = itemRepo;
        this.locationService = locationService;
    }

    public Item findOrNew(ItemRequest request) {
        if (request.id() != null) {
            return itemRepository.findById(request.id()).orElse(new Item());
        }
        return new Item();
    }

    public Item save(Item item) {
        return itemRepository.save(item);
    }

    public Item createItem(ItemRequest request) {
        try {
            Item item = findOrNew(request);

            item.setBrand(request.brand());
            item.setName(request.name());
            item.setQuantity(request.quantity());
            item.setLocation(locationService.findOrFail(request.locationId()));
            item.setRemovedDate(request.removedDate());
            item.setDeletedDate(request.deletedDate());

            if (item.getDateAdded() == null) {
                item.setDateAdded(new Date());
            }

            return save(item);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
