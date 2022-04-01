import { NgModule } from '@angular/core';

import * as Components from '.';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipes/pipe.module";

@NgModule({
  declarations: [
    Components.ActiveItemsPipe,
    Components.AddItemFormComponent,
    Components.AddLocationModalComponent,
    Components.CardComponent,
    Components.CountManagerComponent,
    Components.DownloadItemsComponent,
    Components.FilterComponent,
    Components.InactiveItemsPipe,
    Components.SearchFilterPipe,
    Components.NavigationComponent,
    Components.InventoryFilterComponent,
    Components.ItemAddedAlertComponent,
    Components.ItemCardsComponent,
    Components.ItemTableComponent,
    Components.OosTableComponent,
    Components.OutOfStockButtonComponent,
    Components.TableContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule
  ],
  providers: [
    Components.ActiveItemsPipe,
    Components.InactiveItemsPipe
  ],
  bootstrap: [],
  exports: [
    Components.AddItemFormComponent,
    Components.AddLocationModalComponent,
    Components.CardComponent,
    Components.CountManagerComponent,
    Components.DownloadItemsComponent,
    Components.FilterComponent,
    Components.InactiveItemsPipe,
    Components.NavigationComponent,
    Components.InventoryFilterComponent,
    Components.ItemAddedAlertComponent,
    Components.ItemCardsComponent,
    Components.ItemTableComponent,
    Components.OosTableComponent,
    Components.OutOfStockButtonComponent,
    Components.TableContainerComponent
  ]
})
export class ComponentModule { }
