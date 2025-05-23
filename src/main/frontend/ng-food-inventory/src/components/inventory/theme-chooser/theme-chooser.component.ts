import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-theme-chooser',
    template: `
    <div class="z-50 dropdown dropdown-end">
      <span tabindex="0" class="btn m-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </span>
      <ul tabindex="0"
        class="block dropdown-content menu p-2 shadow bg-neutral text-neutral-content rounded-box w-52 h-60 overflow-y-scroll">
        <li *ngFor="let theme of themeService.themes">
          <a (click)="themeService.curTheme.set(theme)" (keyup)="themeService.curTheme.set(theme)" tabindex="0">{{ theme }}</a>
        </li>
      </ul>
    </div>
  `,
    imports: [NgFor]
})
export class ThemeChooserComponent {
  constructor(public themeService: ThemeService) { }
}
