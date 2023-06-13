import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-nav-items',
    templateUrl: './nav-items.component.html',
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class NavItemsComponent {}
