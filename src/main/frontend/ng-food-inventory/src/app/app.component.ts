import { Component } from '@angular/core';
import {InventoryService} from "../services";
import {ThemeService} from "../services/theme.service";
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/layout/navigation/navigation.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgIf, NavigationComponent, RouterOutlet]
})
export class AppComponent {
  title = 'Food Inventory';

  constructor(
    public inventoryService: InventoryService,
    public themeService: ThemeService
  ){}
}
