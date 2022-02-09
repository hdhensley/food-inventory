import { Component } from '@angular/core';
import {InventoryService} from "../../services";

@Component({
  selector: 'app-out-of-stock',
  templateUrl: './out-of-stock.component.html',
})
export class OutOfStockComponent {
  constructor(public inventoryService: InventoryService) {}
}
