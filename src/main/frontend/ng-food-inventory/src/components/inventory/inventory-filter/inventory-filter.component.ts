import {Component} from '@angular/core';
import {InventoryService, LocationService} from "../../../services";

@Component({
  selector: 'app-inventory-filter',
  templateUrl: './inventory-filter.component.html',
})
export class InventoryFilterComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
