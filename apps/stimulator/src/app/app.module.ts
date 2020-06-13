// Core angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

// Third party modules
import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LocalStorageModule } from 'angular-2-local-storage';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Application modules
import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";
import { StimLibStoreModule } from "@diplomka-frontend/stim-lib-store";
import { StimFeatureNavigationFeatureModule } from "@diplomka-frontend/stim-feature-navigation/feature";

// Application components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Aplikační proměnné
import { environment } from "../environments/environment";
import { INTRO_STEPS } from './share/intro.service';

// Interceptory (modifikátory http komunikace)
import { DEFAULT_TIMEOUT, RequestTimeoutInterceptor } from './share/interceptors/request-timeout-interceptor.service';
import { ResponseInterceptor } from './share/interceptors/response-interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TOKEN_PROVIDERS } from "./token-providers";
import { StimFeatureSettingsDomainModule } from "@diplomka-frontend/stim-feature-settings/domain";
import { StimLibConnectionModule } from "@diplomka-frontend/stim-lib-connection";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function createIntroStepsLoader(http: HttpClient) {
  return http.get(`./assets/steps.json`).toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // Third party modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE, enableSourceMaps: !environment.production}),
    LocalStorageModule.forRoot({ prefix: 'stim-control', storageType: 'localStorage' }),
    StimLibStoreModule,
    StimLibConnectionModule.forRoot(),
    StimFeatureSettingsDomainModule,
    StimFeatureNavigationFeatureModule,

    // ShareModule,
    StimLibUiModule,

    // Root routing module
    AppRoutingModule
  ],
  providers: [
    ...TOKEN_PROVIDERS,
    {
      provide: DEFAULT_TIMEOUT,
      useValue: 3000
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTimeoutInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: INTRO_STEPS,
      useFactory: createIntroStepsLoader,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
