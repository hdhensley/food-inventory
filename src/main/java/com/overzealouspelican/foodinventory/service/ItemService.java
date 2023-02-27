package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;
import lombok.RequiredArgsConstructor;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ItemService {
    public final ItemRepository itemRepository;
    public final LocationService locationService;

    public Item findOrNew(ItemRequest request) {
        if(request.getId() != null){
            return itemRepository.findById(request.getId()).orElse(new Item());
        }
        return new Item();
    }

    public Item save(Item item) {
        return itemRepository.save(item);
    }

    public Item createItem(ItemRequest request) {
        try {
            Item item = findOrNew(request);

            item.setBrand(request.getBrand());
            item.setName(request.getName());
            item.setQuantity(request.getQuantity());
            item.setLocation(locationService.findOrFail(request.getLocationId()));
            item.setRemovedDate(request.getRemovedDate());
            item.setDeletedDate(request.getDeletedDate());

            if(item.getDateAdded() == null) {
                item.setDateAdded(new Date());
            }

            return save(item);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
