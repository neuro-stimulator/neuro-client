import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StimLibCommonModule } from '@diplomka-frontend/stim-lib-common';
import { StimFeatureAuthDomainModule } from '@diplomka-frontend/stim-feature-auth/domain';

import { StimFeatureAuthFeatureRoutingModule } from './stim-feature-auth-feature-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginGuard } from './login/login.guard';
import { AuthGuard } from './auth.guard';
import { LogoutGuard } from './logout/logout.guard';

@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent, RegisterComponent],
  providers: [AuthGuard, LoginGuard, LogoutGuard],
  imports: [TranslateModule, StimLibCommonModule, StimFeatureAuthFeatureRoutingModule, StimFeatureAuthDomainModule],
})
export class StimFeatureAuthFeatureModule {}
