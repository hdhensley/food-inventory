package com.overzealouspelican.foodinventory.repo;

import com.overzealouspelican.foodinventory.model.Location;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<Location, Integer> {
}
