import {Component} from "@angular/core";
import { ThemeChooserComponent } from "../../inventory/theme-chooser/theme-chooser.component";
import { DownloadItemsComponent } from "../../inventory/download-items/download-items.component";
import { InventorySelectorComponent } from "../../inventory/inventory-selector/inventory-selector.component";
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
