package com.overzealouspelican.foodinventory.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

@Entity
@ToString
@RequiredArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "Name is required.")
    @NotNull(message = "Name cannot be null.")
    @Column(unique = true)
    private String inventoryKey;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Collection<Location> locations = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Inventory inventory = (Inventory) o;
        return id != null && Objects.equals(id, inventory.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getInventoryKey() {
        return inventoryKey;
    }

    public void setInventoryKey(String inventoryKey) {
        this.inventoryKey = inventoryKey;
    }

    public Collection<Location> getLocations() {
        return locations;
    }

    public void setLocations(Collection<Location> locations) {
        this.locations = locations;
    }
}
