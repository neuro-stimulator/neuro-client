import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from 'stim-lib-modal';

import { FabModule } from '../share/fab/fab.module';
import { SequenceViewerModule } from '../share/sequence-viewer/sequence-viewer.module';
import { ShareModule } from '../share/share.module';
import { TagEditorModule } from '../share/tag-editor/tag-editor.module';
import { SequencesRoutingModule } from './sequences-routing.module';
import { SequencesComponent } from './sequences.component';
import { SequenceItemListComponent } from './sequence-item-list/sequence-item-list.component';
import { SequenceGhostItemListComponent } from './sequence-ghost-item-list/sequence-ghost-item-list.component';
import { SequenceComponent } from './sequence/sequence.component';

@NgModule({
  declarations: [
    SequencesComponent,
    SequenceItemListComponent,
    SequenceGhostItemListComponent,
    SequenceComponent
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
    TagEditorModule
  ]
})
export class SequencesModule {

}
