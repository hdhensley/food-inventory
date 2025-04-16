import {Component, Input} from '@angular/core';
import {Item} from "../../../models/item.model";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-edit-item-button',
    template: `
      <a *ngIf="item" [routerLink]="['/','item', item.id, 'edit']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </a>
    `,
    imports: [NgIf, RouterLink]
})
export class EditItemButtonComponent {
  @Input() item: Item | undefined;
}
