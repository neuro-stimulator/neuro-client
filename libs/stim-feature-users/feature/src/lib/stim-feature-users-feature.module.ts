import { NgModule } from '@angular/core';

import { StimLibCommonModule } from '@diplomka-frontend/stim-lib-common';
import { StimFeatureUsersDomainModule } from '@diplomka-frontend/stim-feature-users/domain';
import { StimFeatureAuthDomainModule } from '@diplomka-frontend/stim-feature-auth/domain';

import { StimFeatureUsersFeatureRoutingModule } from './stim-feature-users-feature-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    StimLibCommonModule,
    StimFeatureUsersDomainModule,
    StimFeatureUsersFeatureRoutingModule,
    StimFeatureAuthDomainModule,
  ],
})
export class StimFeatureUsersFeatureModule {}
