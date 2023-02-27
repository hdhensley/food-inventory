package com.overzealouspelican.foodinventory.repo;

import com.overzealouspelican.foodinventory.model.Inventory;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
    Optional<Inventory> findByInventoryKey(String inventoryKey);
}
