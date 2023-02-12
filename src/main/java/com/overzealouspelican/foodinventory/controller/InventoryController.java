package com.overzealouspelican.foodinventory.controller;

import com.overzealouspelican.foodinventory.model.Inventory;
import com.overzealouspelican.foodinventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping(path="api/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping
    @ResponseBody
    public void saveInventory(@RequestBody Inventory inventory) {
        // @TODO Allow inventory uploads in the same format as the download
        log.debug(inventory.toString());
    }

    @GetMapping
    @ResponseBody
    public Inventory getInventory(@RequestParam String key) {
        Inventory inventory = inventoryService.findByInventoryKey(key);

        if(inventory != null){
            return inventory;
        }

        return inventoryService.createNewInventory(key);
    }
}
