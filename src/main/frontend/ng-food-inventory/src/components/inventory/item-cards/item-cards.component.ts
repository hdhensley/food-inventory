import { Component, inject } from '@angular/core';
import { InventoryService, LocationService } from '../../../services';
import { SearchFilterPipe } from '../../../pipes/filter/search-filter.pipe';
import { DisplayDatePipe } from '../../../pipes/display-date.pipe';
import { ActiveItemsPipe } from '../../../pipes/filter/active-items.pipe';
import { CountManagerComponent } from '../count-manager/count-manager.component';
import { OutOfStockButtonComponent } from '../out-of-stock-button/out-of-stock-button.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    OutOfStockButtonComponent,
    NgIf,
    CountManagerComponent,
    ActiveItemsPipe,
    DisplayDatePipe,
    SearchFilterPipe,
  ],
})
export class ItemCardsComponent {
  public inventoryService: InventoryService;
  public locationService: LocationService;
  constructor() {
    this.inventoryService = inject(InventoryService);
    this.locationService = inject(LocationService);
  }
}
