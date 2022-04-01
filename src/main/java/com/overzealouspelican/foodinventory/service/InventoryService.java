package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public Inventory findOrFail(Integer id) throws IllegalArgumentException {
        return inventoryRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Data"));
    }

    public Inventory findByInventoryKey(String key) {
        return inventoryRepository.findByInventoryKey(key);
    }

    public Inventory createNewInventory(String key) {
        Inventory newInventory = new Inventory();
        newInventory.setInventoryKey(key);

        inventoryRepository.save(newInventory);

        return newInventory;
    }
}
