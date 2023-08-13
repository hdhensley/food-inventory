import { Component } from '@angular/core';
import {InventoryService} from "../../../services";
import {Item} from "../../../models/item.model";

@Component({
    selector: 'app-download-items',
    templateUrl: './download-items.component.html',
    standalone: true,
})
export class DownloadItemsComponent {

  constructor(private inventoryService: InventoryService) {}

  downloadInventory() {
    try {
      this.download(this.generateInventoryUrl());
    } catch(e) {
      console.error('There are no inventory items to download');
    }
  }

  private download(url: string){
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  private generateInventoryUrl(): string {
    const items = this.inventoryService.items;

    if(items.length === 0) {
      throw 'no items';
    }

    const data = this.generateCSV(items);

    const blob = new Blob([data], {type:'text/csv'});
    return window.URL.createObjectURL(blob);
  }

  private generateCSV(items: Item[]): string {
    const _items = [...items];
    // @ts-ignore
    _items.forEach(i => i.location = i.location.name);
    return Object.keys(_items[0]).join(', ') + '\r\n' + // header row
           _items.map((i: Item) => Object.values(i).join(', ')).join('\r\n'); //csv body
  }
}
