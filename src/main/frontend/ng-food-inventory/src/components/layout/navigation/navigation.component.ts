import {Component} from "@angular/core";
import { ThemeChooserComponent, DownloadItemsComponent, InventorySelectorComponent } from "../../inventory";
import { NavItemsComponent } from "./nav-items/nav-items.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-navigation',
    template: `
      <div class="navbar-wrapper">
        <div class="flex-none px-2 mx-2">
          <a [routerLink]="['']" class="text-lg font-bold"> Inventory </a>
        </div>
        <div class="flex-1 px-2 mx-2">
          <div class="items-stretch hidden md:flex">
            <app-nav-items></app-nav-items>
          </div>
        </div>
        <div class="flex-none">
          <app-inventory-selector></app-inventory-selector>
          <app-download-items></app-download-items>
          <app-theme-chooser></app-theme-chooser>

          <div class="z-50 dropdown dropdown-end md:hidden">
            <span tabindex="0" class="btn m-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <div tabindex="0" class="dropdown-content w-44 menu p-2 shadow bg-neutral text-neutral-content rounded-box">
              <app-nav-items class="flex flex-col justify-end p-2"></app-nav-items>
            </div>
          </div>
        </div>
      </div>
    `,
    standalone: true,
    imports: [
        RouterLink,
        NavItemsComponent,
        InventorySelectorComponent,
        DownloadItemsComponent,
        ThemeChooserComponent,
    ],
})
export class NavigationComponent {}
