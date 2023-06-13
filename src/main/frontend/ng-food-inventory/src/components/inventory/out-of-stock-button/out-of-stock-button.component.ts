import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import {InventoryService} from "../../../services";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-out-of-stock-button',
    templateUrl: './out-of-stock-button.component.html',
    standalone: true,
    imports: [NgIf],
})
export class OutOfStockButtonComponent{
  @Input() item: Item | undefined;
  constructor(public inventoryService: InventoryService) {}
}
