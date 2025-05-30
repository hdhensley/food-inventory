import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-form-wrapper',
    template: `
      <div class="pt-4 mx-auto w-11/12 sm:w-3/4 md:w-1/2 xl:w-1/3">
        <app-card>
          <div *ngIf="header">
            <h2 class="card-title text-center text-secondary-content">{{header}}</h2>
          </div>
          <div *ngIf="header" class="divider"></div>
          <div *ngIf="title">
            <h2 class="card-title text-secondary-content">{{title}}</h2>
          </div>
          <div>
            <ng-content></ng-content>
          </div>
        </app-card>
      </div>
    `,
    imports: [CardComponent, NgIf]
})
export class FormWrapperComponent {
  @Input() header: string|false = false;
  @Input() title: string|false = false;
}
