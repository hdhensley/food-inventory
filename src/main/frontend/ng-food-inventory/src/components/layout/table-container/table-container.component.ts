import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-table-container',
    template: `
      <app-card>
        <ng-content select=".tableFilter"></ng-content>

        <ng-content select=".filter"></ng-content>

        <div *ngIf="showTable">
          <ng-content></ng-content>
        </div>
        <div *ngIf="!showTable || loading" class="flex justify-center bg-secondary text-secondary-content p-6 rounded font-bold text-xl" >
          <ng-content *ngIf="!showTable" select=".noTableData"></ng-content>
          <ng-content *ngIf="loading" select=".loading"></ng-content>
        </div>
      </app-card>
    `,
    imports: [CardComponent, NgIf]
})
export class TableContainerComponent {
  @Input() showTable = false;
  @Input() loading = false;
  @Input() title = 'TITLE';
}
