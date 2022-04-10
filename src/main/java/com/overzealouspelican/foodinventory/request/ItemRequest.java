package com.overzealouspelican.foodinventory.request;

import lombok.Data;

import java.util.Date;

@Data
public class ItemRequest {
    Integer locationId;
    Integer id;
    String brand;
    String name;
    Float quantity;
    Date removedDate;
    Date deletedDate;
}
