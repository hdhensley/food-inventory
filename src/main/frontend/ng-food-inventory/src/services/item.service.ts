import {Injectable} from '@angular/core';
import {Item} from "../models/item.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends HttpClient {
  saveItem(item: Item): Observable<Item> {
    return this.post<Item>(`${environment.apiUrl}/item`, this.generateRequest(item));
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
