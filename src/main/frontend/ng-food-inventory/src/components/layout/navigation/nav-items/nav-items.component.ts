import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-nav-items',
    template: `
      <a
        [routerLink]="['inventory']"
        routerLinkActive="active-nav-link"
        class="nav-link">
        Inventory
      </a>
      <a
        [routerLink]="['out-of-stock']"
        routerLinkActive="active-nav-link"
        class="nav-link">
        Out of Stock
      </a>
      <a
        [routerLink]="['item','create']"
        routerLinkActive="active-nav-link"
        class="nav-link">
        Add Items
      </a>
    `,
    imports: [RouterLinkActive, RouterLink]
})
export class NavItemsComponent {}
