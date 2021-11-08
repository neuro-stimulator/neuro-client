import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Sequence } from '@stechy1/diplomka-share';

import { StimLibUiModule } from '@neuro-client/stim-lib-ui';
import { StimLibListUtilsModule } from '@neuro-client/stim-lib-list-utils';

import { SequencesItemListComponent } from './sequence-item-list/sequences-item-list.component';
import { SequencesGhostItemListComponent } from './sequence-ghost-item-list/sequences-ghost-item-list.component';
import { SequenceComponent } from './sequence/sequence.component';
import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';
import { SequencesRoutingModule } from './sequences-routing.module';
import { StimFeatureSequencesDomainModule } from '@neuro-client/stim-feature-sequences/domain';
import { SequencesComponent } from './sequences.component';

@NgModule({
  declarations: [
    SequencesComponent,
    SequencesItemListComponent,
    SequencesGhostItemListComponent,
    SequenceComponent,
    SequencesFilterDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),

    SequencesRoutingModule,
    StimLibUiModule,
    StimLibListUtilsModule.forChild<Sequence>({
      storageSuffix: 'sequences',
      fuseKeys: ['name'],
    }),
    StimFeatureSequencesDomainModule
  ]
})
export class StimFeatureSequencesFeatureModule {}
