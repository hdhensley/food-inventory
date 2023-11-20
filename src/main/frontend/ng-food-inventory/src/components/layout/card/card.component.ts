import {Component} from '@angular/core';

@Component({
    selector: 'app-card',
    template: `
      <div class="shadow-lg compact side bg-primary text-primary-content min-h-screen">
        <div class="flex-1 flex-col card-body">
          <ng-content></ng-content>
        </div>
      </div>
    `,
    standalone: true,
})
export class CardComponent{}
