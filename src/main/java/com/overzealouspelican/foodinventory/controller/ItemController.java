package com.overzealouspelican.foodinventory.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import com.overzealouspelican.foodinventory.model.Item;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.overzealouspelican.foodinventory.request.ItemRequest;
import com.overzealouspelican.foodinventory.service.ItemService;

@Controller
@RequestMapping(path = "api/item")
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    @ResponseBody
    public Item saveItem(@RequestBody ItemRequest request) {
        return itemService.createItem(request);
    }
}
