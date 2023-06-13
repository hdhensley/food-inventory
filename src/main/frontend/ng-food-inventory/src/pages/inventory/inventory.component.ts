import {Component} from '@angular/core';
import {InventoryService, LocationService} from "../../services";
import { RouterLink } from '@angular/router';
import { ItemCardsComponent } from '../../components/inventory/item-cards/item-cards.component';
import { FilterComponent } from '../../components/inventory/filter/filter.component';
import { InventoryLocationSelectorComponent } from '../../components/inventory/inventory-location-selector/inventory-location-selector.component';
import { TableContainerComponent } from '../../components/layout/table-container/table-container.component';

@Component({
    selector: 'app-inventory-page',
    templateUrl: './inventory.component.html',
    standalone: true,
    imports: [
        TableContainerComponent,
        InventoryLocationSelectorComponent,
        FilterComponent,
        ItemCardsComponent,
        RouterLink,
    ],
})
export class InventoryComponent {
  constructor(
    public inventoryService: InventoryService,
    public locationService: LocationService
  ){}
}
