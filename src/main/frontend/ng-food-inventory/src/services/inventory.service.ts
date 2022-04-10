import {Injectable} from "@angular/core";
import {Inventory} from '../models/Inventory.model';
import {Item} from "../models/item.model";
import {Location} from '../models/location.model';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ItemService} from "./item.service";
import {BehaviorSubject} from "rxjs";
import {LocationService} from "./location.service";
import {ActiveItemsPipe, InactiveItemsPipe} from "../pipes";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private _loaded: boolean = false;
  private _inventorySub: BehaviorSubject<Inventory> = new BehaviorSubject<Inventory>(new Inventory());
  private _search: string = '';

  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private locationService: LocationService,
    private activePipe: ActiveItemsPipe,
    private inactivePipe: InactiveItemsPipe
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

  getItem(itemId: string | null): Item | undefined {
    return this.items.find(i => i.id == itemId);
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

  getLocation(id: number): Location|undefined {
    return this.inventory.locations.find(l => l.id === id);
  }

  getLocations(): Location[] {
    return this.inventory.locations;
  }

  saveItem(item: Item): Promise<Item | undefined> {
    const save = this.itemService.saveItem(item);

    save.then(res => this.loadInventory()).catch(err => console.error(err));

    // @ts-ignore
    return save;
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

  get search(): string{
    return this._search;
  }

  set search(query: string) {
    this._search = query;
  }
}
