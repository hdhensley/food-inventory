import { Component, inject } from '@angular/core';
import {InventoryService} from "../services";
import {ThemeService} from "../services/theme.service";
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/layout';
import { NgIf } from '@angular/common';
import {ToastViewerComponent} from "../components/layout/toast-viewer/toast-viewer.component";

@Component({
    selector: 'app-root',
    template: `
    <div 
      class="min-h-screen" 
      [attr.data-theme]="themeService.curTheme()" 
      *ngIf="inventoryService.loaded">

      <app-navigation></app-navigation>

      <router-outlet></router-outlet>

      <app-toast-viewer></app-toast-viewer>
      
    </div>
  `,
    imports: [NgIf, NavigationComponent, RouterOutlet, ToastViewerComponent]
})
export class AppComponent {
  title = 'Food Inventory';

  inventoryService = inject(InventoryService);
  themeService = inject(ThemeService);
}
