package com.overzealouspelican.foodinventory.request;

import java.util.Date;

public record ItemRequest(int locationId, Integer id, String brand, String name, float quantity, Date removedDate, Date deletedDate) {};
