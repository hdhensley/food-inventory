import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipes/pipe.module';
import { LayoutModule } from './layout/layout.module';
import { InventoryModule } from './inventory/inventory.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventoryModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
  ],
  bootstrap: [],
  exports: [],
})
export class ComponentModule { }
