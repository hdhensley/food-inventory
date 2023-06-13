import { NgModule } from '@angular/core';

import * as L from '.';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../../pipes/pipe.module";
import {InventoryModule} from "../inventory/inventory.module";

const items = [
  L.CardComponent,
  L.FormWrapperComponent,
  L.NavigationComponent,
  L.NavItemsComponent,
  L.TableContainerComponent,
];

@NgModule({
    imports: [
        CommonModule,
        InventoryModule,
        ReactiveFormsModule,
        RouterModule,
        PipeModule,
        ...items
    ],
    exports: items
})
export class LayoutModule { }
