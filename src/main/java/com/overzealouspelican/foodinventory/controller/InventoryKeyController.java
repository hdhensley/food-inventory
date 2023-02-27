package com.overzealouspelican.foodinventory.controller;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.overzealouspelican.foodinventory.service.InventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(path="api/inventoryKey")
public class InventoryKeyController {
    private final InventoryService inventoryService;

    @GetMapping
    public Collection<String> getAllKeys() {
        return inventoryService.getInventoryKeys();
    }
}
