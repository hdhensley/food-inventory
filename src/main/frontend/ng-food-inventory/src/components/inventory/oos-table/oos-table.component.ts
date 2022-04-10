import {Component} from '@angular/core';
import {InventoryService} from "../../../services";
import {InactiveItemsPipe} from "../../../pipes";

@Component({
  selector: 'app-oos-table',
  templateUrl: './oos-table.component.html',
  providers: [InactiveItemsPipe]
})
export class OosTableComponent {
  constructor(public inventoryService: InventoryService) {}
}
