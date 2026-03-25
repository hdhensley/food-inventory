import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { ComponentModule } from './components/component.module';
import { LayoutModule } from './components/layout/layout.module';
import { environment } from './environments/environment';
import { PagesModule } from './pages/pages.module';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      ComponentModule,
      PagesModule,
      LayoutModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch(err => console.error(err));
