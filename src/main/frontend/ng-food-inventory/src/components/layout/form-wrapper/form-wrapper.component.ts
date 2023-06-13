import {Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
    selector: 'app-form-wrapper',
    templateUrl: './form-wrapper.component.html',
    standalone: true,
    imports: [CardComponent, NgIf],
})
export class FormWrapperComponent {
  @Input() header: string|false = false;
  @Input() title: string|false = false;
}
