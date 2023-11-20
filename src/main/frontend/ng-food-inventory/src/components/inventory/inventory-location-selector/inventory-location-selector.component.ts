import {Component, computed, inject} from '@angular/core';
import {InventoryService} from "../../../services";
import { InventoryFilterComponent } from '../inventory-filter/inventory-filter.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-inventory-location-selector',
    template: `
      <div class="tableFilter" *ngIf="shouldShow">
        <app-inventory-filter></app-inventory-filter>
      </div>
    `,
    standalone: true,
    imports: [NgIf, InventoryFilterComponent]
})
export class InventoryLocationSelectorComponent {
  shouldShow = computed(() => this.inventoryService.inventory().locations.length > 0);

  inventoryService = inject(InventoryService);
}
