import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Location } from '../models/location.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SaveLocationRequest } from 'src/requests/save-location.request';
import { InventoryService } from './inventory.service';
import { tap, catchError, of } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends HttpClient {
  activeLocation: WritableSignal<number | undefined> = signal(0);
  currentLocation = computed(() => this.getLocation(this.activeLocation()));

  inventoryService = inject(InventoryService);
  toastService = inject(ToastService);

  /**
   * Checks if a location is currently active.
   * 
   * @param locationId Location ID to check if it is active.
   * @returns boolean indicating if the location is active.
   */
  isActive(locationId: number | undefined): boolean {
    return this.activeLocation() == locationId;
  }

  /**
   * Clear the active location, setting it to 0.
   */
  clearActive() {
    this.activeLocation.set(0);
  }

  /**
   * Saves a location to the server and sets it as the active location.
   * 
   * @param locationId Location ID to set as active.
   */
  saveLocation(location: Location) {
    return this.post(`${environment.apiUrl}/location`, new SaveLocationRequest(location));
  }

  /**
   * Retrieves a location by its ID from the inventory. If the ID is undefined, it returns undefined.
   * @param id ID of the location to retrieve.
   * @returns Location with the specified ID, or undefined if not found.
   */
  getLocation(id: number | undefined): Location | undefined {
    return this.inventoryService.inventory().locations.find((l) => l.id === id);
  }

  /**
   * Adds a new location to the inventory and reloads the inventory after saving.
   * 
   * @param location Location to add to the inventory.
   */
  addLocation(location: Location): void {
    this.saveLocation(location)
      .pipe(
        tap(() => this.toastService.success("Location added")),
        tap(() => this.inventoryService.loadInventory()),
        catchError(() => of(this.toastService.error("Error adding location")))
      ).subscribe();
  }

  /**
   * Formats the display name of a location, including its parent locations.
   * 
   * @param location Location to format.
   * @returns Formatted string representing the location's hierarchy.
   */
  locationDisplayFormatter = (location: Location): string => {
    if (location.parent?.parent) {
      return this.locationDisplayFormatter(location.parent) + ' > ' + location.name;
    }

    if(location.parent) {
      return location.parent.name + ' > ' + location.name;
    }
    
    if (location) {
      return location.name ?? '';
    }

    return '';  
  }
}
