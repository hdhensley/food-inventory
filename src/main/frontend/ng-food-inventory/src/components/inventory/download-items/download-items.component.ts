import { Component, computed, inject } from '@angular/core';
import {InventoryService} from "../../../services";
import {Item} from "../../../models/item.model";

@Component({
    selector: 'app-download-items',
    template: `
      <button class="btn btn-square btn-ghost hover:text-accent" (click)="downloadInventory()" download="inventory.csv">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      </button>
    `,
    standalone: true,
})
export class DownloadItemsComponent {
  inventoryService = inject(InventoryService);

  inventoryUrl = computed(() => {
    const items = this.inventoryService.items();

    if(items.length === 0) {
      throw 'no items';
    }

    const data = this.generateCSV(items);

    const blob = new Blob([data], {type:'text/csv'});
    return window.URL.createObjectURL(blob);
  })

  downloadInventory() {
    try {
      this.download(this.inventoryUrl());
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

  private generateCSV(items: Item[]): string {
    const _items = [...items];
    // @ts-ignore
    _items.forEach(i => i.location = i.location.name);
    return Object.keys(_items[0]).join(', ') + '\r\n' + // header row
           _items.map((i: Item) => Object.values(i).join(', ')).join('\r\n'); //csv body
  }
}
