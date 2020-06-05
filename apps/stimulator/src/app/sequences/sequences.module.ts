import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { Sequence } from '@stechy1/diplomka-share';

import { StimLibListUtilsModule } from '@diplomka-frontend/stim-lib-list-utils';

import { ShareModule } from '../share/share.module';
import { SequencesRoutingModule } from './sequences-routing.module';
import { SequencesComponent } from './sequences.component';
import { SequenceItemListComponent } from './sequence-item-list/sequence-item-list.component';
import { SequenceGhostItemListComponent } from './sequence-ghost-item-list/sequence-ghost-item-list.component';
import { SequenceComponent } from './sequence/sequence.component';
import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';
import { StimLibUiModule } from "@diplomka-frontend/stim-lib-ui";

@NgModule({
  declarations: [
    SequencesComponent,
    SequenceItemListComponent,
    SequenceGhostItemListComponent,
    SequenceComponent,
    SequencesFilterDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),

    SequencesRoutingModule,
    ShareModule,
    StimLibUiModule,
    StimLibListUtilsModule.forChild<Sequence>({
      storageSuffix: 'sequences',
      fuseKeys: ['name'],
    })
  ]
})
export class SequencesModule {

}
