import { Component, inject } from '@angular/core';
import { InventoryService, LocationService } from "../../../services";
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-inventory-filter',
    templateUrl: './inventory-filter.component.html',
    imports: [
    NgClass,
    RouterLink
]
})
export class InventoryFilterComponent {
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}
