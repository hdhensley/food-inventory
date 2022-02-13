import { NgModule } from '@angular/core';

import * as Components from '.';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipes/pipe.module";

@NgModule({
  declarations: [
    Components.AddItemFormComponent,
    Components.AddLocationModalComponent,
    Components.CardComponent,
    Components.DownloadItemsComponent,
    Components.NavigationComponent,
    Components.InventoryFilterComponent,
    Components.ItemTableComponent,
    Components.OosTableComponent,
    Components.TableContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule
  ],
  providers: [],
  bootstrap: [],
  exports: [
    Components.AddItemFormComponent,
    Components.AddLocationModalComponent,
    Components.CardComponent,
    Components.DownloadItemsComponent,
    Components.NavigationComponent,
    Components.InventoryFilterComponent,
    Components.ItemTableComponent,
    Components.OosTableComponent,
    Components.TableContainerComponent
  ]
})
export class ComponentModule { }
