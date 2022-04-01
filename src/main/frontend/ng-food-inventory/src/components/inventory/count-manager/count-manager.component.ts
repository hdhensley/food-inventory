import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import {InventoryService} from "../../../services";

@Component({
  selector: 'app-count-manager',
  templateUrl: './count-manager.component.html',
})
export class CountManagerComponent {
  @Input() item: Item | undefined;
  constructor(public inventoryService: InventoryService){}
}
