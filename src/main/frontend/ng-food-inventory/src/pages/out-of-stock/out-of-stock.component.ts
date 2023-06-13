import { Component } from '@angular/core';
import {InventoryService} from "../../services";
import { OosTableComponent } from '../../components/inventory/oos-table/oos-table.component';
import { TableContainerComponent } from '../../components/layout/table-container/table-container.component';

@Component({
    selector: 'app-out-of-stock',
    templateUrl: './out-of-stock.component.html',
    standalone: true,
    imports: [TableContainerComponent, OosTableComponent],
})
export class OutOfStockComponent {
  constructor(public inventoryService: InventoryService) {}
}
