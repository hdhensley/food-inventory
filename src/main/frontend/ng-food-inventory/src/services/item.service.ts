import {Injectable} from '@angular/core';
import {Item} from "../models/item.model";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { SaveItemRequest } from 'src/requests/save-item.request';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends HttpClient {
  /**
   * Saves an item to the server.
   * 
   * @param item The item to save.
   * @returns An observable of the saved item.
   */
  saveItem(item: Item): Observable<Item> {
    return this.post<Item>(`${environment.apiUrl}/item`, new SaveItemRequest(item));
  }
}
