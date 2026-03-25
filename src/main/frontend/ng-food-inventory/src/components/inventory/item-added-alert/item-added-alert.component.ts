import { Component, Input } from '@angular/core';
import { Item } from "../../../models/item.model";


@Component({
    selector: 'app-item-added-alert',
    template: `
      @if (item) {
        <div class="bg-green-500 text-white rounded p-3 mb-4 mt-2">
          Item added successfully! {{ item.name }}
        </div>
      }
      `,
    imports: []
})
export class ItemAddedAlertComponent {
  @Input() item: Item | undefined;
}
