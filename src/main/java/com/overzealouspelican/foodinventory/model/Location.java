package com.overzealouspelican.foodinventory.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernate_lazy_initializer", "handler"})
@RequiredArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Getter
    @Setter
    private Integer id;

    @Getter
    @Setter
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "inventory_id", nullable = false)
    @Getter
    @Setter
    @JsonIgnore
    private Inventory inventory;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    @Getter
    @Setter
    @ToString.Exclude
    private Collection<Item> items = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    private Location parent;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<Location> children;

    @JsonIgnore
    public Set<Location> getChildren() {
        return children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Location location = (Location) o;
        return id != null && Objects.equals(id, location.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

