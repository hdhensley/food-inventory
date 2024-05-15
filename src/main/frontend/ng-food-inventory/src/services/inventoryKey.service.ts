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
  public key: WritableSignal<string> = signal(environment.inventoryKey);
  public allKeys: WritableSignal<Set<string>> = signal(new Set());

  private http = inject(HttpClient);

  constructor() {
    this.loadKey();
    this.getAllInventoryKeys();

    effect(() => localStorage.setItem('inventoryKey', this.key()));
  }

  public loadKey(): void {
    const savedKey =
      localStorage.getItem('inventoryKey') || environment.inventoryKey;
    this.key.set(savedKey);
    this.allKeys.update(curKeys => {
      return new Set([...curKeys, savedKey]);
    });
  }

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

  public getAllInventoryKeys(): void {
    this.http
      .get<string[]>(`${environment.apiUrl}/inventoryKey`)
      .subscribe({
        next: (keys: string[]) => {
          this.allKeys.update(allKeys => {
            return new Set([...allKeys, ...keys]);
          });
        },
        error: console.error,
      });
  }
}
