package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;

import lombok.AllArgsConstructor;

import java.util.Set;

import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    /**
     * Finds an inventory by its ID. If not found, throws an EntityNotFoundException.
     * @param id inventory ID
     * @return the found inventory
     * @throws IllegalArgumentException if the ID is invalid
     */
    public Inventory findOrFail(int id) throws IllegalArgumentException {
        return inventoryRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid Data"));
    }

    /**
     * Finds an inventory by its key. If not found, throws an EntityNotFoundException.
     * @param key inventory key
     * @return the found inventory
     */
    public Inventory findByInventoryKey(String key) throws EntityNotFoundException {
        return inventoryRepository
            .findByInventoryKey(key)
            .orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Finds all distinct inventory keys.
     * @return a set of distinct inventory keys
     */
    public Set<String> getInventoryKeys() {
        return inventoryRepository.findDistinctInventoryKeys();
    }

    /**
     * Finds an inventory by its key. If not found, creates a new inventory with the given key.
     * @param key inventory key
     * @return the found or newly created inventory
     */
    public Inventory findOrCreate(String key) {
        return inventoryRepository
            .findByInventoryKey(key)
            .orElseGet(() -> createNew(key));

    }

    /**
     * Creates a new inventory with the given key.
     * @param key inventory key
     * @return the newly created inventory
     */
    public Inventory createNew(String key) {
        Inventory newInventory = new Inventory();
        newInventory.setInventoryKey(key);

        inventoryRepository.save(newInventory);

        return newInventory;
    }
}
