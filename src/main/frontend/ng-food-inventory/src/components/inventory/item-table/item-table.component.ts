import {Component, Input} from '@angular/core';
import {InventoryService} from "../../../services";
import {Item} from "../../../models/item.model";

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html'
})
export class ItemTableComponent {
  constructor(public inventoryService: InventoryService) {}
}
