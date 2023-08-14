import {Component} from '@angular/core';
import { AddItemFormComponent } from '../../components/inventory';
import { FormWrapperComponent } from '../../components/layout';

@Component({
    selector: 'app-add-items',
    templateUrl: './add-items.component.html',
    standalone: true,
    imports: [FormWrapperComponent, AddItemFormComponent],
})
export class AddItemsComponent {}
