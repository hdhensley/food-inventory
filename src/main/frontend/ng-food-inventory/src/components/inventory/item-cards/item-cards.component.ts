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
  template: `
    <div style="z-index: 1" class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div *ngFor="
          let item of inventoryService.items()
            | activeItems : locationService.activeLocation()
            | searchFilter : inventoryService.search()
        " class="card w-full mb-3 bg-secondary text-secondary-content">
        <div class="card-body">
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <a [routerLink]="['/', 'item', item.id, 'edit']">
                <span class="italic">{{ item.brand ? item.brand : " " }}</span>
                <br />
                <span class="card-title">{{ item.name }}</span>
              </a>
            </div>
            <div class="flex pr-2">
              <app-out-of-stock-button [item]="item"></app-out-of-stock-button>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-3">
            <p *ngIf="item.location">
              {{ item.location.name }}
            </p>
            <p *ngIf="item.dateAdded">
              {{ item.dateAdded | displayDate }}
            </p>
          </div>
          <div class="card-actions justify-end">
            <app-count-manager [item]="item"></app-count-manager>
          </div>
        </div>
      </div>
    </div>
  `,
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
  inventoryService = inject(InventoryService);
  locationService = inject(LocationService);
}
