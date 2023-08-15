import {Component} from "@angular/core";
import { ThemeChooserComponent, DownloadItemsComponent, InventorySelectorComponent } from "../../inventory";
import { NavItemsComponent } from "./nav-items/nav-items.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
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
