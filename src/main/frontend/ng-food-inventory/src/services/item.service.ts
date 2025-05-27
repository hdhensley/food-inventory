import { computed, inject, Injectable } from '@angular/core';
import { Item } from "../models/item.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { SaveItemRequest } from 'src/requests/save-item.request';
import { InventoryService } from './inventory.service';
import { ToastService } from './toast.service';
import { ActiveItemsPipe, InactiveItemsPipe } from 'src/pipes';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends HttpClient {
  inventoryService = inject(InventoryService);
  toastService = inject(ToastService);
  activePipe = inject(ActiveItemsPipe)
  inactivePipe = inject(InactiveItemsPipe);

  /**
   * All items in the inventory, including those in locations.
   * This is a computed property that combines items from all locations.
   */
  items = computed(() => {
    let items: Item[] = [];

    this.inventoryService.inventory().locations.forEach((location: Location) => {
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
   * Retrieves an item by its ID from the inventory. If the ID is null, it returns undefined.
   * @param itemId ID of the item to retrieve.
   * @returns Item with the specified ID, or undefined if not found.
   */
  getItem(itemId: string | null): Item | undefined {
    return this.items().find((i) => i.id == itemId);
  }

  /**
   * Saves an item to the inventory and reloads the inventory after saving.
   * 
   * @param item Item to save in the inventory.
   * @returns Observable of the saved item.
   */
  saveItem(item: Item): Observable<Item> {
    return this.post<Item>(`${environment.apiUrl}/item`, new SaveItemRequest(item))
      .pipe(
        catchError((err) => {
          console.error(err);
          this.toastService.error("Error saving item");
          return of(item);
        })
      );
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
      this.saveItem(item)
        .pipe(
          tap(() => this.inventoryService.loadInventory()), // Reload inventory after saving
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
      i.quantity = Math.max(i.quantity - 1, 0); // Ensure quantity does not go below zero

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
  deleteItem(id: string) {
    this.updateItem(id, (i: Item) => {
      i.deletedDate = new Date().toJSON();
      return i;
    });
  }
}
