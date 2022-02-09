package com.overzealouspelican.foodinventory.repo;

import com.overzealouspelican.foodinventory.model.Inventory;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
    Inventory findByInventoryKey(String inventoryKey);
}
