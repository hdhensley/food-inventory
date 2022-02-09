package com.overzealouspelican.foodinventory.repo;

import com.overzealouspelican.foodinventory.model.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, Integer> {
}
