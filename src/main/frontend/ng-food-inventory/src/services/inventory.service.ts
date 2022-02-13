import {Inject, Injectable} from "@angular/core";
import {Inventory} from '../models/Inventory.model';
import {Item} from "../models/item.model";
import {Location} from '../models/location.model';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ItemService} from "./item.service";
import {BehaviorSubject} from "rxjs";
import {LocationService} from "./location.service";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private _loaded: boolean = false;
  private _inventorySub: BehaviorSubject<Inventory> = new BehaviorSubject<Inventory>(new Inventory());

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private locationService: LocationService
  ) {
    if(!this._loaded){
      this.loadInventory();
    }
  }

  private loadInventory() {
    this.http.get('http://' + window.location.hostname + ':8080/api/inventory?key=' + environment.inventoryKey)
      .toPromise()
      .then((res: any) => {
        this._loaded = true;
        this._inventorySub.next(res);
      })
      .catch(err => console.log(err));
  }

  get loaded(): boolean {
    return this._loaded;
  }

  get inventory(): Inventory {
    return this._inventorySub.value;
  }

  get items(): Item[] {
    let items: Item[] = [];

    this.inventory.locations.forEach((location: Location) => {
      location.items.forEach(item => item.location = location);
      items = items.concat(location.items);
    });

    return items;
  }

  get activeItems(): Item[] {
    const items = this.items?.filter(i => !i.removedDate).filter(i => !i.deletedDate);

    if(this.locationService.activeLocation != 0){
      return items.filter(i => i.location?.id === this.locationService.activeLocation);
    }

    return items;
  }

  get inactiveItems(): Item[] {
    return this.items?.filter(i => i.removedDate).filter(i => !i.deletedDate);
  }

  hasItems(): boolean {
    return !!this.items.length;
  }

  hasActiveItems(): boolean {
    return !!this.activeItems.length;
  }

  hasInactiveItems(): boolean {
    return !!this.inactiveItems.length;
  }

  getLocation(id: number): Location|undefined {
    return this.inventory.locations.find(l => l.id === id);
  }

  addItem(item: Item): void {
    this.itemService.saveItem(item)
      .then(res => this.loadInventory())
      .catch(err => console.error(err));
  }

  addLocation(location: Location): Promise<Object | undefined> {
    const promise = this.locationService.saveLocation(location)

    promise
      .then(res => this.loadInventory())
      .catch(err => console.error(err));

    return promise;
  }

  updateItem(id: string, callback: (i: Item) => Item){
    let item = this.items.find(i => i.id === id);

    if(item){
      item = callback(item);
      console.log(item);
      this.itemService.saveItem(item)
        .then(res => this.loadInventory())
        .catch(err => console.error(err));
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

      if(i.quantity === 0){
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
    const date = new Date();
    return date.toJSON();
  }
}
