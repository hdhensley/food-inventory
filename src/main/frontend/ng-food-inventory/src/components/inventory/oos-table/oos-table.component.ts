import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DisplayDatePipe, InactiveItemsPipe } from '../../../pipes';
import { ItemService } from '../../../services';

@Component({
  selector: 'app-oos-table',
  template: `
    <div class="flex justify-end">
      <button class="btn btn-primary mb-2" (click)="clearAll()">Clear All</button>
    </div>
    <table class="table table-zebra w-full bg-base-300 text-base-content">
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Name</th>
          <th>Location</th>
          <th>Date Removed</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" *ngFor="let item of itemService.items() | inactiveItems; let id = index">
          <td>{{ item.id }}</td>
          <td>{{ item.brand ? item.brand : '-' }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.location?.name }}</td>
          <td>{{ item.removedDate | displayDate }}</td>
          <td class="flex flex-col">
            <button
              type="button"
              (click)="deleteItem(item.id)"
              class="btn btn-outline btn-circle btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-4 h-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  providers: [InactiveItemsPipe],
  imports: [NgFor, DisplayDatePipe, InactiveItemsPipe],
})
export class OosTableComponent {
  inactiveItemsPipe = inject(InactiveItemsPipe);
  itemService = inject(ItemService);

  deleteItem(itemId: string) {
    console.log(`Deleting item with ID: ${itemId}`);
    this.itemService.deleteItem(itemId);
  }

  clearAll() {
    this.inactiveItemsPipe
      .transform(this.itemService.items())
      .forEach(item => this.itemService.deleteItem(item.id));
  }
}
