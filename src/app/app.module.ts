// Core angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    NavigationModule,
    ModalModule,

    // Third party modules
    ToastrModule.forRoot(),
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE, enableSourceMaps: true}),

    // Root routing module
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
