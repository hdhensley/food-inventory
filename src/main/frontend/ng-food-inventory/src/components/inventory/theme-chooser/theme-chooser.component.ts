import { Component } from '@angular/core';
import {ThemeService} from "../../../services/theme.service";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-theme-chooser',
    templateUrl: './theme-chooser.component.html',
    standalone: true,
    imports: [NgFor],
})
export class ThemeChooserComponent {
  constructor(public themeService: ThemeService) {}

  setTheme(themeName: string): void {
    this.themeService.curTheme = themeName;
  }
}
