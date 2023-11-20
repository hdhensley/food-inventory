import { Injectable, WritableSignal, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themes: string[] = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
  ].sort();

  public curTheme: WritableSignal<string> = signal('');

  themeUpdater = effect(() => {
    if (this.curTheme() != '') {
      localStorage.setItem(this.themeKey, this.curTheme());
    }
  });

  themeKey = 'CHOSEN_THEME';

  constructor() {
    const currentTheme = localStorage.getItem(this.themeKey);

    if (currentTheme !== null) {
      this.curTheme.set(currentTheme);
    }
  }
}
