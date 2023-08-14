import { effect, Injectable, signal, WritableSignal } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private _loaded = false;
  public inventory: WritableSignal<Inventory> = signal(new Inventory());
  public search: WritableSignal<string> = signal('');

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private locationService: LocationService,
    private activePipe: ActiveItemsPipe,
    private inactivePipe: InactiveItemsPipe,
    private inventoryKeyService: InventoryKeyService,
    private toastService: ToastService
  ) {
    effect(() => {
      console.log('Key changed');
      console.log(this.inventoryKeyService.key());

      this.loadInventory();
    });
  }

  private loadInventory() {
    console.log('Loading inventory ' + this.inventoryKeyService.key());
    this.http
      .get<Inventory>(`http://${window.location.hostname}:8080/api/inventory?key=${this.inventoryKeyService.key()}`)
      .pipe(
        tap((res) => this._loaded = true),
        tap((res) => this.inventory.set(res)),
        catchError((err) => of(this.toastService.error('Inventory could not be loaded')))
      ).subscribe();
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get items(): Item[] {
    let items: Item[] = [];

    this.inventory().locations.forEach((location: Location) => {
      location.items.forEach((item) => (item.location = location));
      items = items.concat(location.items);
    });

    return items;
  }

  getItem(itemId: string | null): Item | undefined {
    return this.items.find((i) => i.id == itemId);
  }

  hasItems(): boolean {
    return !!this.items.length;
  }

  hasActiveItems(): boolean {
    return !!this.activePipe.transform(this.items).length;
  }

  hasInactiveItems(): boolean {
    return !!this.inactivePipe.transform(this.items).length;
  }

  getCurrentLocation(): Location | undefined {
    if (this.locationService.activeLocation() !== undefined) {
      return this.getLocation(this.locationService.activeLocation());
    }
    return undefined;
  }

  getLocation(id: number | undefined): Location | undefined {
    return this.inventory().locations.find((l) => l.id === id);
  }

  getLocations(): Location[] {
    return this.inventory().locations;
  }

  saveItem(item: Item): Observable<Item> {
    return this.itemService.saveItem(item)
      .pipe(
        tap((res) => this.loadInventory()),
        tap((res) => this.toastService.success("Item saved")),
        catchError((err) => {
          this.toastService.error("Error saving item");
          return of(item);
        })
      );
  }

  addLocation(location: Location): void {
    this.locationService.saveLocation(location)
      .pipe(
        tap((res) => this.toastService.success("Location added")),
        tap((res) => this.loadInventory()),
        catchError((err) => of(this.toastService.error("Error adding location")))
      ).subscribe();
  }

  updateItem(id: string, callback: (i: Item) => Item): void {
    let item = this.items.find((i) => i.id === id);

    if (item) {
      item = callback(item);
      this.itemService.saveItem(item)
        .pipe(
          tap((res) => this.loadInventory()),
          catchError((err) => of(this.toastService.error("Error updating item")))
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
