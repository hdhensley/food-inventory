import { HttpClient } from "@angular/common/http";
import {effect, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import { environment } from "src/environments/environment";
import { Inventory } from "src/models/Inventory.model";

@Injectable({
    providedIn: 'root'
})
export class InventoryKeyService {
  public key: WritableSignal<string> = signal(environment.inventoryKey);
  public allKeys: WritableSignal<Set<string>> = signal(new Set<string>());

    constructor(private http: HttpClient) {
        this.loadKey();
        this.getAllInventoryKeys();

        effect(() => localStorage.setItem("inventoryKey", this.key()));
    }

    public loadKey(): void {
        const savedKey = localStorage.getItem("inventoryKey") || environment.inventoryKey;
        this.key.set(savedKey);
        this.allKeys.mutate(curKeys => curKeys.add(savedKey));
    }

    public createInventory(inventoryKey: string): void {
        this.http.get<Inventory>(`http://${window.location.hostname}:8080/api/inventory?key=${inventoryKey}`)
          .subscribe({
            next: (inventory: Inventory) => {
              if (inventory.inventoryKey != null) {
                // @ts-ignore
                this.allKeys.mutate(curKeys => curKeys.add(inventory.inventoryKey));
              }
            },
            error: console.error
        });
    }

    public getAllInventoryKeys(): void {
        this.http.get<string[]>(`http://${window.location.hostname}:8080/api/inventoryKey`).subscribe({
            next: (keys: string[]) => {
                keys.forEach(key => this.allKeys.mutate(curKeys => curKeys.add(key)))
            },
            error: console.error
        })
    }
}
