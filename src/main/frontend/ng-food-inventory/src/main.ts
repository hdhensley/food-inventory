import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { LayoutModule } from './components/layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ComponentModule } from './components/component.module';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ComponentModule, PagesModule, LayoutModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
