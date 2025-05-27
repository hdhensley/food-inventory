import { Component } from '@angular/core';
import { AddItemFormComponent } from '../../components/inventory';
import { FormWrapperComponent } from '../../components/layout';

@Component({
    selector: 'app-add-items',
    template: `
    <app-form-wrapper header="Manage Items" title="Add Item">
      <app-add-item-form></app-add-item-form>
    </app-form-wrapper>
    `,
    imports: [FormWrapperComponent, AddItemFormComponent]
})
export class AddItemsComponent {}
