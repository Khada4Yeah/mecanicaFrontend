import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

import { provideNzIcons } from './icons-provider';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';


registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNzIcons(), provideNzI18n(es_ES), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};
