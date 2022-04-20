import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
})
export class FormWrapperComponent {
  @Input() header: string|false = false;
  @Input() title: string|false = false;
}
