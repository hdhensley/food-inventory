import { Component, inject } from '@angular/core';
import { ItemService } from "../../services";
import { OosTableComponent } from '../../components/inventory/oos-table/oos-table.component';
import { TableContainerComponent } from '../../components/layout/table-container/table-container.component';

@Component({
    selector: 'app-out-of-stock',
    template: `
      <div class="xl:container xl:mx-auto">
        <app-table-container
          title="Out Of Stock Inventory"
          [showTable]="itemService.hasInactiveItems()">

          <app-oos-table></app-oos-table>

          <div class="noTableData">
            There's nothing to show
          </div>

        </app-table-container>
      </div>
    `,
    imports: [TableContainerComponent, OosTableComponent]
})
export class OutOfStockComponent {
  itemService = inject(ItemService);
}
