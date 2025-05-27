import {Component, inject} from '@angular/core';
import {InventoryService, ItemService, LocationService} from "../../services";
import { RouterLink } from '@angular/router';
import { ItemCardsComponent } from '../../components/inventory/item-cards/item-cards.component';
import { FilterComponent } from '../../components/inventory/filter/filter.component';
import { InventoryLocationSelectorComponent } from '../../components/inventory/inventory-location-selector/inventory-location-selector.component';
import { TableContainerComponent } from '../../components/layout/table-container/table-container.component';

@Component({
    selector: 'app-inventory-page',
    template: `
      <div class="xl:container xl:mx-auto h-max mt-4 pb-4">
        <app-table-container 
          [showTable]="itemService.hasActiveItems()"
          [loading]="inventoryService.loading()">
          <app-inventory-location-selector></app-inventory-location-selector>

          <app-filter (searchChanged)="inventoryService.search.set($event)"></app-filter>

          <app-item-cards></app-item-cards>

          <div class="noTableData">
            There's nothing to show
            <a [routerLink]="['/', 'item', 'create']"
              class="btn btn-ghost btn-sm rounded-btn bg-neutral hover:bg-neutral-focus text-neutral-content ml-3">
              Add Items
            </a>
          </div>
        </app-table-container>
      </div>
    `,
    imports: [
        TableContainerComponent,
        InventoryLocationSelectorComponent,
        FilterComponent,
        ItemCardsComponent,
        RouterLink,
    ]
})
export class InventoryComponent {
  itemService = inject(ItemService);
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}
