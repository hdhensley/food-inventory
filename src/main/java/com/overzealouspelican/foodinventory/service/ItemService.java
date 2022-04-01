package com.overzealouspelican.foodinventory.service;

import com.overzealouspelican.foodinventory.model.Item;
import com.overzealouspelican.foodinventory.repo.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {
    public final ItemRepository itemRepository;

    public Item findOrNew(Integer id) {
        if(id != null){
            return itemRepository.findById(id).orElse(new Item());
        }
        return new Item();
    }

    public Item create(Item item) {
        return itemRepository.save(item);
    }
}
