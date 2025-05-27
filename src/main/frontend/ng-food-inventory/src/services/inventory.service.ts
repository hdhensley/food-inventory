import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Inventory } from '../models/Inventory.model';
import { Item } from '../models/item.model';
import { Location } from '../models/location.model';
import { HttpClient } from '@angular/common/http';
import { ItemService } from './item.service';
import {catchError, Observable, of, tap} from 'rxjs';
import { LocationService } from './location.service';
import { ActiveItemsPipe, InactiveItemsPipe } from '../pipes';
import { InventoryKeyService } from './inventoryKey.service';
import {ToastService} from "./toast.service";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  public loaded = signal(false);
  public inventory: WritableSignal<Inventory> = signal(new Inventory());
  public search: WritableSignal<string> = signal('');
  public loading: WritableSignal<boolean> = signal(false);

  private http = inject(HttpClient);
  private itemService = inject(ItemService);
  private locationService = inject(LocationService);
  private activePipe = inject(ActiveItemsPipe);
  private inactivePipe = inject(InactiveItemsPipe);
  private inventoryKeyService = inject(InventoryKeyService);
  private toastService = inject(ToastService);

  /**
   * All items in the inventory, including those in locations.
   * This is a computed property that combines items from all locations.
   */
  items = computed(() => {
    let items: Item[] = [];

    this.inventory().locations.forEach((location: Location) => {
      location.items.forEach((item) => (item.location = location));
      items = items.concat(location.items);
    });

    return items;
  });

  /**
   * Determines if there are any active items in the inventory.
   */
  hasActiveItems = computed(() => this.activePipe.transform(this.items()).length > 0);

  /**
   * Determines if there are any inactive items in the currently loaded inventory.
   */
  hasInactiveItems = computed(() => this.inactivePipe.transform(this.items()).length > 0);

  /**
   * Checks if there are any items in the currently loaded inventory.
   */
  hasItems = computed(() => this.items().length > 0);

  /**
   * Gets the currently active location from the location service.
   */
  currentLocation = computed(() => this.getLocation(this.locationService.activeLocation()));

  /**
   * All locations in the currently loaded inventory.
   */
  locations = computed(() => this.inventory().locations);

  /**
   * Initializes the InventoryService and sets up an effect to reload the inventory
   * whenever the inventory key changes.
   */
  constructor() {
    effect(() => {
      console.log('Key changed');
      console.log(this.inventoryKeyService.key());

      this.loadInventory();
    });
  }

  /**
   * Load the inventory from the server.
   */
  private loadInventory() {
    this.loading.set(true);
    console.log('Loading inventory ' + this.inventoryKeyService.key());
    this.http
      .get<Inventory>(`${environment.apiUrl}/inventory?key=${this.inventoryKeyService.key()}`)
      .pipe(
        tap((res) => this.inventory.set(res)),
        tap(() => this.loaded.set(true)),
        tap(() => this.loading.set(false)),
        catchError(() => of(this.toastService.error('Inventory could not be loaded')))
      ).subscribe();
  }

  /**
   * Retrieves an item by its ID from the inventory. If the ID is null, it returns undefined.
   * @param itemId ID of the item to retrieve.
   * @returns Item with the specified ID, or undefined if not found.
   */
  getItem(itemId: string | null): Item | undefined {
    return this.items().find((i) => i.id == itemId);
  }

  /**
   * Retrieves a location by its ID from the inventory. If the ID is undefined, it returns undefined.
   * @param id ID of the location to retrieve.
   * @returns Location with the specified ID, or undefined if not found.
   */
  getLocation(id: number | undefined): Location | undefined {
    return this.inventory().locations.find((l) => l.id === id);
  }

  /**
   * Saves an item to the inventory and reloads the inventory after saving.
   * 
   * @param item Item to save in the inventory.
   * @returns Observable of the saved item.
   */
  saveItem(item: Item): Observable<Item> {
    return this.itemService.saveItem(item)
      .pipe(
        tap(() => this.loadInventory()),
        tap(() => this.toastService.success("Item saved")),
        catchError((err) => {
          console.error(err);
          this.toastService.error("Error saving item");
          return of(item);
        })
      );
  }

  /**
   * Adds a new location to the inventory and reloads the inventory after saving.
   * 
   * @param location Location to add to the inventory.
   */
  addLocation(location: Location): void {
    this.locationService.saveLocation(location)
      .pipe(
        tap(() => this.toastService.success("Location added")),
        tap(() => this.loadInventory()),
        catchError(() => of(this.toastService.error("Error adding location")))
      ).subscribe();
  }

  /**
   * Updates an existing item in the inventory.
   * 
   * @param id ID of the item to update.
   * @param callback Callback function to modify the item. This function receives the item as an argument and 
   *                 should return the modified item.
   */
  updateItem(id: string, callback: (i: Item) => Item): void {
    let item = this.items().find((i) => i.id === id);

    if (item) {
      item = callback(item);
      this.itemService.saveItem(item)
        .pipe(
          // tap(() => this.loadInventory()),
          catchError(() => of(this.toastService.error("Error updating item")))
        )
        .subscribe();
    }
  }

  /**
   * Increments the quantity of an item in the inventory.
   * 
   * @param id ID of the item whose quantity is to be incremented.
   */
  incrementQuantity(id: string): void {
    this.updateItem(id, (i) => {
      i.quantity++;
      return i;
    });
  }

  /**
   * Decrements the quantity of an item in the inventory. If the quantity reaches zero, it sets the removed date.
   * 
   * @param id ID of the item whose quantity is to be decremented.
   */
  decrementQuantity(id: string): void {
    this.updateItem(id, (i: Item) => {
      i.quantity > 0 ? i.quantity-- : 0;

      if (i.quantity === 0) {
        i.removedDate = new Date().toJSON();
      }

      return i;
    });
  }

  /**
   * Sets an item as out of stock by updating its removed date.
   * 
   * @param id ID of the item to set as out of stock.
   */
  setOutOfStock(id: string): void {
    this.updateItem(id, (i: Item) => {
      i.removedDate = new Date().toJSON();
      return i;
    });
  }

  /**
   * Sets an item as deleted by updating its deleted date.
   * 
   * @param id ID of the item to delete.
   */
  delete(id: string) {
    this.updateItem(id, (i: Item) => {
      i.deletedDate = new Date().toJSON();
      return i;
    });
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
