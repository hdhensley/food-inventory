import { Component } from '@angular/core';
import {InventoryService} from "../services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Food Inventory';

  constructor(public inventoryService: InventoryService) {}
}
