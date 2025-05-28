import { Component, Input } from '@angular/core';
import { Item } from "../../../models/item.model";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-item-added-alert',
    template: `
      <div *ngIf="item" class="bg-green-500 text-white rounded p-3 mb-4 mt-2">
        Item added successfully! {{ item.name }}
      </div>
    `,
    imports: [NgIf]
})
export class ItemAddedAlertComponent {
  @Input() item: Item | undefined;
}
