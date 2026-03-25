import { Component, computed, inject } from '@angular/core';
import { InventoryService } from "../../../services";
import { InventoryFilterComponent } from '../inventory-filter/inventory-filter.component';


@Component({
    selector: 'app-inventory-location-selector',
    template: `
      @if (shouldShow) {
        <div class="tableFilter">
          <app-inventory-filter></app-inventory-filter>
        </div>
      }
      `,
    imports: [InventoryFilterComponent]
})
export class InventoryLocationSelectorComponent {
  shouldShow = computed(() => this.inventoryService.inventory().locations.length > 0);

  inventoryService = inject(InventoryService);
}
