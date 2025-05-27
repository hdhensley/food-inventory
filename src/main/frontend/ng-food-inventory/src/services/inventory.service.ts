import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Inventory } from '../models/Inventory.model';
import { HttpClient } from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';
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
  private inventoryKeyService = inject(InventoryKeyService);
  private toastService = inject(ToastService);

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
  loadInventory() {
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
}
