package com.overzealouspelican.foodinventory.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {
    @Mock
    private ItemRepository itemRepository;
    @Mock
    private LocationService locationService;

    @InjectMocks
    private ItemService itemService;

    @Test
    void testFindOrNew_newItemIfNull() {
        Item foundItem = itemService.findOrNew(null);

        assertEquals(Item.class, foundItem.getClass());
        assertEquals(null, foundItem.getId());
    }

    @Test
    void testFindOrNew_existingItemIfNotNull() {
        Item item = new Item();
        item.setId(1);

        when(itemRepository.findById(1))
            .thenReturn(Optional.of(item));

        ItemRequest request = new ItemRequest(1, 1, "Brand", "Name", 1.0f, null, null);

        Item foundItem = itemService.findOrNew(request);

        assertEquals(item, foundItem);
    }

    @Test
    void testCreateItem() {
        ItemRequest request = new ItemRequest(
            1, 
            null, 
            "Brand", 
            "Name", 
            1.0f, 
            null, 
            null
        );

        Location location = new Location();
        location.setId(1);

        when(itemRepository.save(any(Item.class))).thenReturn(new Item());
        when(locationService.findOrFail(request.locationId())).thenReturn(location);

        Item createdItem = itemService.createItem(request);

        // assertEquals(newItem, createdItem);
        assertEquals(request.brand(), createdItem.getBrand());
        assertEquals(request.name(), createdItem.getName());
        assertEquals(request.quantity(), createdItem.getQuantity());
        assertEquals(request.locationId(), createdItem.getLocation().getId());
        assertEquals(request.removedDate(), createdItem.getRemovedDate());
        assertEquals(request.deletedDate(), createdItem.getDeletedDate());
    }
}
