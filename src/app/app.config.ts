import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';

import { provideNzIcons } from './icons-provider';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { errorInterceptor } from './interceptors/error.interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { tokenInterceptor } from './interceptors/token.interceptor';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNzIcons(),
    provideNzI18n(es_ES),
    importProvidersFrom(FormsModule, NzModalModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor, tokenInterceptor])),
  ],
};
//(withInterceptors([errorInterceptor])
