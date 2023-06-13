import {Component} from '@angular/core';
import {InventoryService} from "../../../services";
import { InventoryFilterComponent } from '../inventory-filter/inventory-filter.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-inventory-location-selector',
    templateUrl: './inventory-location-selector.component.html',
    standalone: true,
    imports: [NgIf, InventoryFilterComponent]
})
export class InventoryLocationSelectorComponent {
  constructor(
    public inventoryService: InventoryService
  ) {}
}
