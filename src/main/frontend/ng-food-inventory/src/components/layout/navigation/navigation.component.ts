import {Component} from "@angular/core";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  menuOpen: boolean = false;
  themeChooserOpen: boolean = false;

  setTheme(themeName: string): void {
    console.log(themeName);
  }
}
