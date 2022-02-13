import {Component} from '@angular/core';
import {InventoryService, LocationService} from "../../services";

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
