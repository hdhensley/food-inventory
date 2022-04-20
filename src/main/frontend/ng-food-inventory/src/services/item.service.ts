import {Injectable} from '@angular/core';
import {Item} from "../models/item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private http: HttpClient
  ) {}

  saveItem(item: Item) {
    return this.http.post('http://' + window.location.hostname + ':8080/api/item', this.generateRequest(item)).toPromise();
  }

  generateRequest(item: Item) {
    return {
      id: item.id,
      locationId: item.location?.id,
      brand: item.brand,
      name: item.name,
      quantity: item.quantity,
      removedDate: item.removedDate,
      deletedDate: item.deletedDate
    };
  }
}
