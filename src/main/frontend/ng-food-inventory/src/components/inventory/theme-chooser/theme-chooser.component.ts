import { Component } from '@angular/core';
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-theme-chooser',
  templateUrl: './theme-chooser.component.html',
})
export class ThemeChooserComponent {
  constructor(public themeService: ThemeService) {}

  setTheme(themeName: string): void {
    this.themeService.curTheme = themeName;
  }
}
