import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themes: string[] = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro",
    "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel",
    "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business",
    "acid", "lemonade", "night", "coffee", "winter"
  ].sort();

  private _curTheme: string = "emerald";

  themeKey: string = "CHOSEN_THEME";

  constructor() {
    const currentTheme = localStorage.getItem(this.themeKey);

    if(currentTheme !== null) {
      this.curTheme = currentTheme;
    }

    console.log(this.curTheme);
  }

  get curTheme(): string {
    return this._curTheme;
  }

  set curTheme(theme: string) {
    this._curTheme = theme;
    localStorage.setItem(this.themeKey, theme);
  }

  get themes(): string[] {
    return this._themes;
  }
}
