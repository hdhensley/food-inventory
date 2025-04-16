package com.overzealouspelican.foodinventory.repo;

import com.overzealouspelican.foodinventory.model.Inventory;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
    Optional<Inventory> findByInventoryKey(String inventoryKey);

    @Query("SELECT DISTINCT i.inventoryKey FROM Inventory i order by i.inventoryKey")
    Set<String> findDistinctInventoryKeys();
}
