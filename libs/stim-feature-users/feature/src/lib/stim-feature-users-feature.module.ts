import { NgModule } from '@angular/core';

import { StimLibCommonModule } from '@neuro-client/stim-lib-common';
import { StimFeatureUsersDomainModule } from '@neuro-client/stim-feature-users/domain';
import { StimFeatureAuthDomainModule } from '@neuro-client/stim-feature-auth/domain';

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
