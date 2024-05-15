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

  private http = inject(HttpClient);
  private itemService = inject(ItemService);
  private locationService = inject(LocationService);
  private activePipe = inject(ActiveItemsPipe);
  private inactivePipe = inject(InactiveItemsPipe);
  private inventoryKeyService = inject(InventoryKeyService);
  private toastService = inject(ToastService);

  constructor() {
    effect(() => {
      console.log('Key changed');
      console.log(this.inventoryKeyService.key());

      this.loadInventory();
    });
  }

  private loadInventory() {
    console.log('Loading inventory ' + this.inventoryKeyService.key());
    this.http
      .get<Inventory>(`${environment.apiUrl}/inventory?key=${this.inventoryKeyService.key()}`)
      .pipe(
        tap((res) => this.inventory.set(res)),
        tap(() => this.loaded.set(true)),
        catchError(() => of(this.toastService.error('Inventory could not be loaded')))
      ).subscribe();
  }

  items = computed(() => {
    let items: Item[] = [];

    this.inventory().locations.forEach((location: Location) => {
      location.items.forEach((item) => (item.location = location));
      items = items.concat(location.items);
    });

    return items;
  });

  hasActiveItems = computed(() => {
    return this.activePipe.transform(this.items()).length > 0;
  });

  hasInactiveItems = computed(() => {
    return this.inactivePipe.transform(this.items()).length > 0;
  });

  hasItems = computed(() => {
    return this.items().length > 0;
  });

  currentLocation = computed(() => {
    return this.getLocation(this.locationService.activeLocation());
  });

  locations = computed(() => {
    return this.inventory().locations;
  });

  getItem(itemId: string | null): Item | undefined {
    return this.items().find((i) => i.id == itemId);
  }

  getLocation(id: number | undefined): Location | undefined {
    return this.inventory().locations.find((l) => l.id === id);
  }

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

  addLocation(location: Location): void {
    this.locationService.saveLocation(location)
      .pipe(
        tap(() => this.toastService.success("Location added")),
        tap(() => this.loadInventory()),
        catchError(() => of(this.toastService.error("Error adding location")))
      ).subscribe();
  }

  updateItem(id: string, callback: (i: Item) => Item): void {
    let item = this.items().find((i) => i.id === id);

    if (item) {
      item = callback(item);
      this.itemService.saveItem(item)
        .pipe(
          tap(() => this.loadInventory()),
          catchError(() => of(this.toastService.error("Error updating item")))
        )
        .subscribe();
    }
  }

  incrementQuantity(id: string): void {
    this.updateItem(id, (i) => {
      i.quantity++;
      return i;
    });
  }

  decrementQuantity(id: string): void {
    this.updateItem(id, (i: Item) => {
      i.quantity > 0 ? i.quantity-- : 0;

      if (i.quantity === 0) {
        i.removedDate = this.getDate();
      }

      return i;
    });
  }

  setOutOfStock(id: string): void {
    this.updateItem(id, (i: Item) => {
      i.removedDate = this.getDate();
      return i;
    });
  }

  delete(id: string) {
    this.updateItem(id, (i: Item) => {
      i.deletedDate = this.getDate();
      return i;
    });
  }

  private getDate(): string {
    return new Date().toJSON();
  }
}
