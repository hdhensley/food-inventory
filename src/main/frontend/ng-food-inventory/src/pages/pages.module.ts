import { NgModule } from '@angular/core';

import * as Pages from '.';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../components/component.module";
import {PipeModule} from "../pipes/pipe.module";
import {LayoutModule} from "../components/layout/layout.module";
import {InventoryModule} from "../components/inventory/inventory.module";

@NgModule({
    imports: [
        ComponentModule,
        CommonModule,
        PipeModule,
        RouterModule,
        LayoutModule,
        InventoryModule,
        Pages.AddItemsComponent,
        Pages.EditItemComponent,
        Pages.InventoryComponent,
        Pages.OutOfStockComponent
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
