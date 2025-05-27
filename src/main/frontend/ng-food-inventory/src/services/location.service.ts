import { Injectable, signal, WritableSignal } from '@angular/core';
import { Location } from '../models/location.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SaveLocationRequest } from 'src/requests/save-location.request';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends HttpClient {
  activeLocation: WritableSignal<number | undefined> = signal(0);

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
}
