import { Component } from '@angular/core';
import {InventoryService} from "../services";
import {ThemeService} from "../services/theme.service";
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/layout';
import { NgIf } from '@angular/common';
import {ToastViewerComponent} from "../components/layout/toast-viewer/toast-viewer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, NavigationComponent, RouterOutlet, ToastViewerComponent]
})
export class AppComponent {
  title = 'Food Inventory';

  constructor(
    public inventoryService: InventoryService,
    public themeService: ThemeService
  ){}
}
