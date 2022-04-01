import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import {InventoryService} from "../../../services";

@Component({
  selector: 'app-out-of-stock-button',
  templateUrl: './out-of-stock-button.component.html',
})
export class OutOfStockButtonComponent{
  @Input() item: Item | undefined;
  constructor(public inventoryService: InventoryService) {}
}
