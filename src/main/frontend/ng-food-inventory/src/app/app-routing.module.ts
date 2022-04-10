import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from '../pages';

const routes: Routes = [
  { path: 'inventory', component: Pages.InventoryComponent },
  { path: 'out-of-stock', component: Pages.OutOfStockComponent },
  { path: 'item/create', component: Pages.AddItemsComponent },
  { path: 'item/:itemId/edit', component: Pages.EditItemComponent },
  { path: '', redirectTo: 'inventory', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
