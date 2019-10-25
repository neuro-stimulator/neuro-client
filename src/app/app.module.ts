// Core angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Third party modules
import { ToastrModule } from 'ngx-toastr';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Application components
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentItemListComponent } from './experiments/experiment-item/experiment-item-list.component';
import { GhostItemListComponent } from './experiments/ghost-item/ghost-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    ExperimentsComponent,
    ExperimentItemListComponent,
    GhostItemListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

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
