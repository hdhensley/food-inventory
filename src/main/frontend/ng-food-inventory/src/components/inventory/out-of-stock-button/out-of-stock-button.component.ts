import { Component, Input, inject } from '@angular/core';
import { Item } from "../../../models/item.model";
import { ItemService } from "../../../services";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-out-of-stock-button',
    template: `
    <button *ngIf="item" (click)="itemService.setOutOfStock(item.id)"
      class="btn btn-outline btn-circle btn-sm text-secondary-content">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    `,
    imports: [NgIf]
})
export class OutOfStockButtonComponent{
  @Input() item: Item | undefined;
  itemService = inject(ItemService);
}
