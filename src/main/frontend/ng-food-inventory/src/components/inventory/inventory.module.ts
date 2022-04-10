import { NgModule } from '@angular/core';

import * as I from '.';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../../pipes/pipe.module";

const items = [
  I.AddItemFormComponent,
  I.AddLocationModalComponent,
  I.CountManagerComponent,
  I.DownloadItemsComponent,
  I.EditItemButtonComponent,
  I.EditItemFormComponent,
  I.FilterComponent,
  I.InventoryFilterComponent,
  I.ItemAddedAlertComponent,
  I.ItemCardsComponent,
  I.ItemTableComponent,
  I.OosTableComponent,
  I.OutOfStockButtonComponent
];

@NgModule({
  declarations: items,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule
  ],
  bootstrap: [],
  exports: items
})
export class InventoryModule { }
