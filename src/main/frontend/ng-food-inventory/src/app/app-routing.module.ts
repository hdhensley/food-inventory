import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as Pages from '../pages';

const routes: Routes = [
  { path: 'inventory', component: Pages.InventoryComponent },
  { path: 'add-items', component: Pages.AddItemsComponent },
  { path: 'out-of-stock', component: Pages.OutOfStockComponent },
  { path: '', redirectTo: 'inventory', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
