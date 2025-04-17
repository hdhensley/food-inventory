package com.overzealouspelican.foodinventory.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;

@ExtendWith(MockitoExtension.class)
public class InventoryServiceTest {
    @Mock
    InventoryRepository inventoryRepository;

    @InjectMocks
    InventoryService inventoryService;

    @Test
    void testFindOrFail_throwsExceptionIfNotFound() {
        int invalidId = 999;

        assertThrows(IllegalArgumentException.class, () -> {
            inventoryService.findOrFail(invalidId);
        });
    }

    @Test
    void testFindOrFail_findsValidInventory() {
        int id = 1;

        Inventory inventory = new Inventory();
        inventory.setId(id);
        inventory.setInventoryKey("testKey");

        when(inventoryRepository.findById(id)).thenReturn(Optional.of(inventory));

        Inventory foundInventory = inventoryService.findOrFail(id);

        assertEquals(id, foundInventory.getId());
        assertEquals("testKey", foundInventory.getInventoryKey());
    }

    @Test
    void testFindByInventoryKey_inventoryIsFoundIfExists() {
        String key = "testKey";

        Inventory inventory = new Inventory();
        inventory.setId(1);
        inventory.setInventoryKey(key);

        when(inventoryRepository.findByInventoryKey(key)).thenReturn(Optional.of(inventory));

        Inventory foundInventory = inventoryService.findByInventoryKey(key);

        assertEquals(key, foundInventory.getInventoryKey());
    }

    @Test
    void testFindByInventoryKey_throwsExceptionIfKeyDoesNotExist() {
        assertThrows(EntityNotFoundException.class, () -> {
            inventoryService.findByInventoryKey("nonExistentKey");
        });
    }

    @Test
    void testCreateNew_createsNewInventoryWithKey() {
        String key = "newKey";

        when(inventoryRepository.save(any(Inventory.class))).thenAnswer(invocation -> {
            Inventory inventory = invocation.getArgument(0);
            inventory.setId(1); // Simulate auto-generated ID
            inventory.setInventoryKey(key);
            return inventory;
        });

        Inventory newInventory = inventoryService.createNew(key);

        assertEquals(key, newInventory.getInventoryKey());
    }

    @Test
    void testFindOrCreate() {
        String key = "existingKey";

        Inventory existingInventory = new Inventory();
        existingInventory.setId(1);
        existingInventory.setInventoryKey(key);

        when(inventoryRepository.findByInventoryKey(key)).thenReturn(Optional.of(existingInventory));

        Inventory foundInventory = inventoryService.findOrCreate(key);

        assertEquals(existingInventory.getId(), foundInventory.getId());
        assertEquals(existingInventory.getInventoryKey(), foundInventory.getInventoryKey());
    }

    @Test
    void testFindOrCreate_createsNewInventoryIfNotFound() {
        String newKey = "newKey";

        when(inventoryRepository.findByInventoryKey(newKey)).thenReturn(Optional.empty());
        when(inventoryRepository.save(any(Inventory.class))).thenAnswer(invocation -> {
            Inventory inventory = invocation.getArgument(0);
            inventory.setId(1); // Simulate auto-generated ID
            inventory.setInventoryKey(newKey);
            return inventory;
        });

        Inventory newInventory = inventoryService.findOrCreate(newKey);

        assertEquals(newKey, newInventory.getInventoryKey());
    }
}
