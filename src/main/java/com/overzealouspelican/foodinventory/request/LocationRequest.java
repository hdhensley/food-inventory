package com.overzealouspelican.foodinventory.request;

import lombok.Data;

@Data
public class LocationRequest {
    Integer id;
    String name;
    Integer inventoryId;
    Integer parent;
}
