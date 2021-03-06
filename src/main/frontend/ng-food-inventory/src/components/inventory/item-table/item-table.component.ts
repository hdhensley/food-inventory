import {Component} from '@angular/core';
import {InventoryService, LocationService} from "../../../services";

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html'
})
export class ItemTableComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
