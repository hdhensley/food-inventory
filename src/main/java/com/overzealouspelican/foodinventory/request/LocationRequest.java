package com.overzealouspelican.foodinventory.request;

public record LocationRequest(int id, String name, int inventoryId, Integer parent) {}
