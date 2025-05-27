import {Component, inject} from '@angular/core';
import {InventoryService, ItemService, LocationService} from "../../../services";
import { SearchFilterPipe } from '../../../pipes/filter/search-filter.pipe';
import { DisplayDatePipe } from '../../../pipes/display-date.pipe';
import { ActiveItemsPipe } from '../../../pipes/filter/active-items.pipe';
import { OutOfStockButtonComponent } from '../out-of-stock-button/out-of-stock-button.component';
import { CountManagerComponent } from '../count-manager/count-manager.component';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-item-table',
    templateUrl: './item-table.component.html',
    imports: [NgIf, NgFor, RouterLink, CountManagerComponent, OutOfStockButtonComponent, ActiveItemsPipe, DisplayDatePipe, SearchFilterPipe]
})
export class ItemTableComponent {
  itemService = inject(ItemService);
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}
