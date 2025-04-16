package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;

import lombok.AllArgsConstructor;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class ItemService {
    public final ItemRepository itemRepository;
    public final LocationService locationService;

    /**
     * Finds an item by its ID or returns a new Item if the request is null or
     * the ID is null.
     * @param request Request containing the ID of the item to find.
     * @return The found item or a new Item if the request is null or the ID is null.
     */
    public Item findOrNew(ItemRequest request) {
        return request != null && request.id() != null ?
            itemRepository.findById(request.id()).orElse(new Item()) :
            new Item();
    }

    /**
     * Creates a new item based on the provided request.
     * @param request The request containing the item details.
     * @return The created item.
     * @throws ResponseStatusException if the request is invalid.
     */
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

            itemRepository.save(item);
            return item;
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
