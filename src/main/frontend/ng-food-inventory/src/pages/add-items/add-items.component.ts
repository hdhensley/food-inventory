import {Component} from '@angular/core';
import { AddItemFormComponent } from '../../components/inventory/add-item-form/add-item-form.component';
import { FormWrapperComponent } from '../../components/layout/form-wrapper/form-wrapper.component';

@Component({
    selector: 'app-add-items',
    templateUrl: './add-items.component.html',
    standalone: true,
    imports: [FormWrapperComponent, AddItemFormComponent],
})
export class AddItemsComponent {
  constructor(){}
}
