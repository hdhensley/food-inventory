import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "../../services";
import {Item} from "../../models/item.model";
import { EditItemFormComponent } from '../../components/inventory/edit-item-form/edit-item-form.component';
import { FormWrapperComponent } from '../../components/layout/form-wrapper/form-wrapper.component';

@Component({
    selector: 'app-edit-item',
    template: `
      <app-form-wrapper header="Manage Items" title="Edit Item">
        <app-edit-item-form [item]="item"></app-edit-item-form>
      </app-form-wrapper>
    `,
    imports: [FormWrapperComponent, EditItemFormComponent]
})
export class EditItemComponent implements OnInit {
  item: Item | undefined;

  route = inject(ActivatedRoute);
  itemService = inject(ItemService);

  ngOnInit(): void {
    this.item = this.itemService.getItem(this.route.snapshot.paramMap.get('itemId'));
    if(!this.item){
      console.error("THE ITEM WAS NOT FOUND");
    }
  }
}
