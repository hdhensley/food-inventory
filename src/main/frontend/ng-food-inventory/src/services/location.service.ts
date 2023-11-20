import { Injectable, signal, WritableSignal } from '@angular/core';
import { Location } from '../models/location.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends HttpClient {
  activeLocation: WritableSignal<number | undefined> = signal(0);

  isActive(locationId: number | undefined) {
    return this.activeLocation() == locationId;
  }

  clearActive() {
    this.activeLocation.set(0);
  }

  saveLocation(location: Location) {
    return this.post(
      `http://${window.location.hostname}:8080/api/location`,
      this.generateRequest(location)
    );
  }

  generateRequest(location: Location) {
    return {
      name: location.name,
      inventoryId: location.inventory_id,
      parent: location.parent,
    };
  }
}
