import {Component} from '@angular/core';
import {InventoryService} from "../../../services";

@Component({
  selector: 'app-oos-table',
  templateUrl: './oos-table.component.html',
})
export class OosTableComponent {
  constructor(public inventoryService: InventoryService) {}
}
