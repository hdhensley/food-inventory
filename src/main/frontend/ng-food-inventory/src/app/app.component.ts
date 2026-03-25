import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/layout';
import { InventoryService } from '../services';
import { ThemeService } from '../services/theme.service';

import { ToastViewerComponent } from '../components/layout/toast-viewer/toast-viewer.component';

@Component({
  selector: 'app-root',
  template: `
    @if (inventoryService.loaded()) {
      <div class="min-h-screen" [attr.data-theme]="themeService.curTheme()">
        <app-navigation></app-navigation>
        <router-outlet></router-outlet>
        <app-toast-viewer></app-toast-viewer>
      </div>
    }
  `,
  imports: [NavigationComponent, RouterOutlet, ToastViewerComponent],
})
export class AppComponent {
  title = 'Food Inventory';

  inventoryService = inject(InventoryService);
  themeService = inject(ThemeService);
}
