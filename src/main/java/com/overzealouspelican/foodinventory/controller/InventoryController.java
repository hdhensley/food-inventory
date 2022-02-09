package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.repo.InventoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Slf4j
@Controller
@RequestMapping(path="api/inventory")
public class InventoryController {
    private final InventoryRepository inventoryRepository;

    public InventoryController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @PostMapping
    @ResponseBody
    public void saveInventory(@RequestBody Inventory inventory) {
        log.debug(inventory.toString());
    }

    @GetMapping
    @ResponseBody
    public Inventory getInventory(@RequestParam String key) {
        Inventory inventory = inventoryRepository.findByInventoryKey(key);

        if(inventory != null){
            return inventory;
        }

        Inventory newInventory = new Inventory();
        newInventory.setInventoryKey(key);

        inventoryRepository.save(newInventory);

        return newInventory;
    }
}
