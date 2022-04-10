import { NgModule } from '@angular/core';

import * as Pages from '.';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../components/component.module";

@NgModule({
  declarations: [
    Pages.AddItemsComponent,
    Pages.EditItemComponent,
    Pages.InventoryComponent,
    Pages.OutOfStockComponent
  ],
  imports: [
      ComponentModule,
      CommonModule,
      RouterModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    Pages.AddItemsComponent,
    Pages.EditItemComponent,
    Pages.InventoryComponent,
    Pages.OutOfStockComponent
  ]
})
export class PagesModule { }
