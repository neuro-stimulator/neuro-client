// Core angular modules
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// Third party modules
import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageModule } from 'angular-2-local-storage';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Application modules
import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimLibStoreModule } from '@neuro-client/stim-lib-store';
import { StimFeatureNavigationFeatureModule } from '@neuro-client/stim-feature-navigation/feature';
import { StimLibConnectionModule } from '@neuro-client/stim-lib-connection';
import { StimLibAssetPlayerModule } from '@neuro-client/stim-lib-asset-player';
import { StimFeatureSettingsDomainModule } from '@neuro-client/stim-feature-settings/domain';
import { AuthFacade, AuthState, StimFeatureAuthDomainModule } from '@neuro-client/stim-feature-auth/domain';

// Application components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Aplikační proměnné
import { environment } from '../environments/environment';
import { INTRO_STEPS } from './share/intro.service';

// Interceptory (modifikátory http komunikace)
import { DEFAULT_TIMEOUT, RequestTimeoutInterceptor } from './share/interceptors/request-timeout-interceptor.service';
import { ResponseInterceptor } from './share/interceptors/response-interceptor.service';
import { SessionInterceptorService } from './share/interceptors/session-interceptor.service';
import { ClientIdInterceptorService } from './share/interceptors/client-id-interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TOKEN_PROVIDERS } from './token-providers';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function createIntroStepsLoader(http: HttpClient) {
  return http.get('./assets/steps.json').toPromise();
}

export function autologinFactory(facade: AuthFacade) {
  return () => {
    facade.refreshToken();
    return new Promise((resolve) => {
      facade.state.subscribe((state: AuthState) => {
        if (state.isAuthenticated !== undefined) {
          resolve(undefined);
        }
      });
    });
  };
}

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'x-xsrf-token',
    }),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),

    // Third party modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      enableSourceMaps: !environment.production,
    }),
    LocalStorageModule.forRoot({
      prefix: 'stim-control',
      storageType: 'localStorage',
    }),
    StimLibStoreModule,
    StimLibConnectionModule.forRoot(),
    StimLibUiModule,
    StimLibAssetPlayerModule,
    StimFeatureSettingsDomainModule,
    StimFeatureNavigationFeatureModule,
    StimFeatureAuthDomainModule,

    // Root routing module
    AppRoutingModule,
  ],
  providers: [
    ...TOKEN_PROVIDERS,
    {
      provide: DEFAULT_TIMEOUT,
      useValue: 3000,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ClientIdInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: SessionInterceptorService,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTimeoutInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: autologinFactory,
      deps: [AuthFacade],
      multi: true,
    },
    {
      provide: INTRO_STEPS,
      useFactory: createIntroStepsLoader,
      deps: [HttpClient],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
