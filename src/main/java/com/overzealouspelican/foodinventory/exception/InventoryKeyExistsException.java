package com.overzealouspelican.foodinventory.exception;

public class InventoryKeyExistsException extends RuntimeException {
    public InventoryKeyExistsException() {
        super("Inventory key already exists");
    }
}
