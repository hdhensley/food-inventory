import { Component, Input } from '@angular/core';

import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-table-container',
    template: `
      <app-card>
        <ng-content select=".tableFilter"></ng-content>
      
        <ng-content select=".filter"></ng-content>
      
        @if (showTable) {
          <div>
            <ng-content></ng-content>
          </div>
        }
        @if (!showTable || loading) {
          <div class="flex justify-center bg-secondary text-secondary-content p-6 rounded font-bold text-xl" >
            @if (!showTable) {
              <ng-content select=".noTableData"></ng-content>
            }
            @if (loading) {
              <ng-content select=".loading"></ng-content>
            }
          </div>
        }
      </app-card>
      `,
    imports: [CardComponent]
})
export class TableContainerComponent {
  @Input() showTable = false;
  @Input() loading = false;
  @Input() title = 'TITLE';
}
