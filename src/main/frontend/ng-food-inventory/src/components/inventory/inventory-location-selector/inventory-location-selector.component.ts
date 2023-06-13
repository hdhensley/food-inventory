import {Component} from '@angular/core';
import {InventoryService} from "../../../services";

@Component({
  selector: 'app-inventory-location-selector',
  templateUrl: './inventory-location-selector.component.html'
})
export class InventoryLocationSelectorComponent {
  constructor(
    public inventoryService: InventoryService
  ) {}
}
