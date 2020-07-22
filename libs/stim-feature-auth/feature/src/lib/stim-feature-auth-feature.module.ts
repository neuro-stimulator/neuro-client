import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StimLibCommonModule } from '@diplomka-frontend/stim-lib-common';
import { StimFeatureAuthDomainModule } from '@diplomka-frontend/stim-feature-auth/domain';

import { StimFeatureAuthFeatureRoutingModule } from './stim-feature-auth-feature-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutController } from './logout/logout.controller';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutController,
    RegisterComponent,
  ],
  imports: [
    TranslateModule,

    StimLibCommonModule,
    StimFeatureAuthFeatureRoutingModule,
    StimFeatureAuthDomainModule,
  ],
})
export class StimFeatureAuthFeatureModule {}
