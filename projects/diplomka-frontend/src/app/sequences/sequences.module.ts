import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { Sequence } from '@stechy1/diplomka-share';

import { ModalModule } from 'stim-lib-modal';
import { FabModule } from 'stim-lib-fab';
import { ListUtilsModule } from 'stim-lib-list-utils';

import { SequenceViewerModule } from '../share/sequence-viewer/sequence-viewer.module';
import { ShareModule } from '../share/share.module';
import { TagEditorModule } from '../share/tag-editor/tag-editor.module';
import { ListButtonsAddonModule } from '../share/list-buttons-addon/list-buttons-addon.module';
import { SequencesRoutingModule } from './sequences-routing.module';
import { SequencesComponent } from './sequences.component';
import { SequenceItemListComponent } from './sequence-item-list/sequence-item-list.component';
import { SequenceGhostItemListComponent } from './sequence-ghost-item-list/sequence-ghost-item-list.component';
import { SequenceComponent } from './sequence/sequence.component';
import { SequencesFilterDialogComponent } from './sequences-filter-dialog/sequences-filter-dialog.component';

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
    FabModule,
    ModalModule,
    SequenceViewerModule,
    ReactiveFormsModule,
    ShareModule,
    TagEditorModule,
    ListButtonsAddonModule,
    ListUtilsModule.forChild<Sequence>({
      storageSuffix: 'sequences',
      fuseKeys: ['name'],
    })
  ]
})
export class SequencesModule {

}
