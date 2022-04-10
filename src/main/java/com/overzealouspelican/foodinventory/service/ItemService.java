package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import com.overzealouspelican.foodinventory.request.ItemRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {
    public final ItemRepository itemRepository;

    public Item findOrNew(ItemRequest request) {
        if(request.getId() != null){
            return itemRepository.findById(request.getId()).orElse(new Item());
        }
        return new Item();
    }

    public Item save(Item item) {
        return itemRepository.save(item);
    }
}
