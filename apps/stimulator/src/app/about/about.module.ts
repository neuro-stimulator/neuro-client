import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    AboutRoutingModule,
    TranslateModule
  ]
})
export class AboutModule {

}
