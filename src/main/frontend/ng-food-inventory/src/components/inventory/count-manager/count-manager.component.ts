import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import {InventoryService} from "../../../services";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-count-manager',
    templateUrl: './count-manager.component.html',
    standalone: true,
    imports: [NgIf],
})
export class CountManagerComponent {
  @Input() item: Item | undefined;
  constructor(public inventoryService: InventoryService){}
}
