import { HttpClient } from '@angular/common/http';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory } from 'src/models/Inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryKeyService {
  /**
   * The current inventory key, which is stored in local storage.
   * It defaults to the key defined in the environment configuration.
   */
  public key: WritableSignal<string> = signal(environment.inventoryKey);
  /**
   * A set of all inventory keys that have been loaded or created.
   * This is used to keep track of available inventory keys.
   */
  public allKeys: WritableSignal<Set<string>> = signal(new Set());

  private http = inject(HttpClient);

  /**
   * Initializes the InventoryKeyService by loading the inventory key from local storage/environment
   * and fetching all available inventory keys from the server.
   * It also sets up an effect to update local storage whenever the key changes.
   */
  constructor() {
    this.loadKey();
    this.getAllInventoryKeys();

    effect(() => localStorage.setItem('inventoryKey', this.key()));
  }

  /**
   * Loads the inventory key from local storage or uses the default key from the environment.
   * It also updates the set of all keys with the loaded key.
   */
  public loadKey(): void {
    const savedKey = localStorage.getItem('inventoryKey') || environment.inventoryKey;
    this.key.set(savedKey);
    this.allKeys.update(curKeys => new Set([...curKeys, savedKey]));
  }

  /**
   * Creates a new inventory with the specified key.
   * If the inventory already exists, it updates the set of all keys.
   * 
   * @param inventoryKey The key for the new inventory.
   */
  public createInventory(inventoryKey: string): void {
    this.http
      .get<Inventory>(
        `${environment.apiUrl}/inventory?key=${inventoryKey}`
      )
      .subscribe({
        next: (inventory: Inventory) => {
          console.log(inventory);
          if (inventory.inventoryKey != null) {
            this.allKeys.update(curKeys => {
              if (inventory.inventoryKey != undefined) {
                curKeys.add(inventory.inventoryKey);
              }
              return new Set(curKeys);
            });
          }
        },
        error: console.error,
      });
  }

  /**
   * Fetches all inventory keys from the server and updates the set of all keys.
   * This method is called to populate the list of available inventory keys.
   */
  public getAllInventoryKeys(): void {
    this.http
      .get<string[]>(`${environment.apiUrl}/inventoryKey`)
      .subscribe({
        next: (keys: string[]) => this.allKeys.update(allKeys => new Set([...allKeys, ...keys])),
        error: console.error,
      });
  }
}
