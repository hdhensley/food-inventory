import {Component, Input, inject} from '@angular/core';
import {Item} from "../../../models/item.model";
import {ItemService} from "../../../services";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-count-manager',
    template: `
      <div *ngIf="item" class="btn-group">
        <button class="btn btn-xs" (click)="itemService.incrementQuantity(item.id)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <button class="btn btn-xs">{{item.quantity}}</button>
        <button class="btn btn-xs" (click)="itemService.decrementQuantity(item.id)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `,
    imports: [NgIf]
})
export class CountManagerComponent {
  itemService = inject(ItemService);

  @Input() item: Item | undefined;
}
