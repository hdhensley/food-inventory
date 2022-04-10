import { NgModule } from '@angular/core';

import * as C from '.';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipes/pipe.module";

@NgModule({
  declarations: [
    C.ActiveItemsPipe,
    C.AddItemFormComponent,
    C.AddLocationModalComponent,
    C.CardComponent,
    C.CountManagerComponent,
    C.DownloadItemsComponent,
    C.EditItemFormComponent,
    C.FilterComponent,
    C.FormWrapperComponent,
    C.InactiveItemsPipe,
    C.SearchFilterPipe,
    C.NavigationComponent,
    C.InventoryFilterComponent,
    C.ItemAddedAlertComponent,
    C.ItemCardsComponent,
    C.ItemTableComponent,
    C.OosTableComponent,
    C.OutOfStockButtonComponent,
    C.TableContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule
  ],
  providers: [
    C.ActiveItemsPipe,
    C.InactiveItemsPipe
  ],
  bootstrap: [],
  exports: [
    C.AddItemFormComponent,
    C.AddLocationModalComponent,
    C.CardComponent,
    C.CountManagerComponent,
    C.DownloadItemsComponent,
    C.EditItemFormComponent,
    C.FilterComponent,
    C.FormWrapperComponent,
    C.InactiveItemsPipe,
    C.NavigationComponent,
    C.InventoryFilterComponent,
    C.ItemAddedAlertComponent,
    C.ItemCardsComponent,
    C.ItemTableComponent,
    C.OosTableComponent,
    C.OutOfStockButtonComponent,
    C.TableContainerComponent
  ]
})
export class ComponentModule { }
