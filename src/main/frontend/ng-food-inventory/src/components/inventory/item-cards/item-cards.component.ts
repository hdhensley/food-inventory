import { Component } from '@angular/core';
import {InventoryService, LocationService} from "../../../services";

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
})
export class ItemCardsComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
