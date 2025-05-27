import { Component, inject } from '@angular/core';
import { InventoryService, LocationService } from "../../../services";
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-inventory-filter',
    templateUrl: './inventory-filter.component.html',
    imports: [
        NgClass,
        NgFor,
        NgIf,
        RouterLink,
    ]
})
export class InventoryFilterComponent {
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}
