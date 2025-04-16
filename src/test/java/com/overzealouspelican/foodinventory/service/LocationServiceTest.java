package com.overzealouspelican.foodinventory.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.overzealouspelican.foodinventory.model.Location;
import com.overzealouspelican.foodinventory.repo.LocationRepository;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {
    @Mock
    private LocationRepository locationRepository;

    @InjectMocks
    private LocationService locationService;

    @Test
    void testFindOrNew_newLocationIfNull() {
        Location location = locationService.findOrNew(null);

        assertEquals(Location.class, location.getClass());
    }

    @Test
    void testFindOrNew_existingLocationIfNotNull() {
        Location location = new Location();
        location.setId(1);

        when(locationRepository.findById(1))
            .thenReturn(Optional.of(location));

        Location foundLocation = locationService.findOrNew(1);

        assertEquals(location, foundLocation);
    }

    @Test
    void testFindOrFail_throwsExceptionIfNotFound() {
        when(locationRepository.findById(1))
            .thenReturn(Optional.empty());

        assertThrows(
            IllegalArgumentException.class, 
            () -> locationService.findOrFail(1)
        );
    }

    @Test
    void testFindOrFail_returnsLocationIfFound() {
        Location location = new Location();
        location.setId(1);

        when(locationRepository.findById(1))
            .thenReturn(Optional.of(location));

        Location foundLocation = locationService.findOrFail(1);

        assertEquals(location, foundLocation);
    }
}
