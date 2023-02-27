package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public Inventory findOrFail(int id) throws EntityNotFoundException {
        return inventoryRepository
                .findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Data"));
    }

    public Inventory findByInventoryKey(String key) {
        return inventoryRepository.findByInventoryKey(key).orElseThrow(EntityNotFoundException::new);
    }

    public Set<String> getInventoryKeys() {
        Set<String> keys = new HashSet<>();
        
        inventoryRepository.findAll().forEach((i) -> keys.add(i.getInventoryKey()));

        return keys;
    }

    public Inventory findOrCreate(String key) {
        Optional<Inventory> inventory = inventoryRepository.findByInventoryKey(key);

        if(inventory.isPresent()){
            return inventory.get();
        }

        return createNew(key);
    }

    public Inventory createNew(String key) {
        Inventory newInventory = new Inventory();
        newInventory.setInventoryKey(key);

        inventoryRepository.save(newInventory);

        return newInventory;
    }
}
