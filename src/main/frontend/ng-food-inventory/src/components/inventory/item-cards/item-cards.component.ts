import { Component, inject } from '@angular/core';
import { InventoryService, LocationService } from '../../../services';
import { SearchFilterPipe } from '../../../pipes/filter/search-filter.pipe';
import { DisplayDatePipe } from '../../../pipes/display-date.pipe';
import { ActiveItemsPipe } from '../../../pipes/filter/active-items.pipe';
import { CountManagerComponent } from '../count-manager/count-manager.component';
import { OutOfStockButtonComponent } from '../out-of-stock-button/out-of-stock-button.component';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-item-cards',
    template: `
    <div style="z-index: 1" class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        *ngFor="
          let item of inventoryService.items()
            | activeItems : locationService.activeLocation()
            | searchFilter : inventoryService.search()
        "
      >
      <div class="bg-secondary text-secondary-content rounded-xl shadow-lg p-6 flex flex-col justify-between h-full transition hover:shadow-xl">
        <!-- Top: Item Info + Out-of-stock -->
        <div class="flex justify-between items-start gap-4">
          <!-- Brand and Name -->
          <div class="flex-1 min-w-0">
            <a [routerLink]="['/', 'item', item.id, 'edit']" class="hover:underline block">
              <p 
                [title]="item.brand" 
                class="text-sm text-secondary-content italic truncate">
                {{ item.brand }}
              </p>
              <h2 
                [title]="item.name" 
                class="text-xl font-semibold truncate">
                {{ item.name }}
              </h2>
            </a>
          </div>

          <!-- Out of Stock Button (won't shrink) -->
          <div class="shrink-0">
            <app-out-of-stock-button [item]="item"></app-out-of-stock-button>
          </div>
        </div>

        <!-- Middle: Location + Date -->
        <div class="flex justify-between items-center text-sm text-secondary-content mt-6">
          <span class="truncate">{{ item.location?.name || 'No Location' }}</span>
          <span>{{ item.dateAdded | displayDate }}</span>
        </div>

        <!-- Bottom: Count Manager -->
        <div class="flex justify-end mt-6">
          <app-count-manager [item]="item"></app-count-manager>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
      NgFor,
      RouterLink,
      OutOfStockButtonComponent,
      CountManagerComponent,
      ActiveItemsPipe,
      DisplayDatePipe,
      SearchFilterPipe,
  ]
})
export class ItemCardsComponent {
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}