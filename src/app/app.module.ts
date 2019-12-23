// Core angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Third party modules
import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Application modules
import { ModalModule } from './share/modal/modal.module';

// Application components
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Interceptory (modifikátory http komunikace)
import { DEFAULT_TIMEOUT, RequestTimeoutInterceptor } from './share/interceptors/request-timeout-interceptor.service';
import { ResponseInterceptor } from './share/interceptors/response-interceptor.service';
import { ShareModule } from './share/share.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    NavigationModule,
    ShareModule,
    ModalModule,

    // Third party modules
    ToastrModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE, enableSourceMaps: !environment.production}),
    LocalStorageModule.forRoot({prefix: 'stim-control', storageType: 'localStorage'}),

    // Root routing module
    AppRoutingModule
  ],
  providers: [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
