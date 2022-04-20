import { Component } from '@angular/core';
import {InventoryService} from "../services";
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Food Inventory';

  constructor(
    public inventoryService: InventoryService,
    public themeService: ThemeService
  ){}
}
