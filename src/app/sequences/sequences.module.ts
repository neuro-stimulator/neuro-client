import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SequencesRoutingModule } from './sequences-routing.module';
import { SequencesComponent } from './sequences.component';
import { SequenceItemListComponent } from './sequence-item-list/sequence-item-list.component';
import { SequenceGhostItemListComponent } from './sequence-ghost-item-list/sequence-ghost-item-list.component';
import { SequenceComponent } from './sequence/sequence.component';
import { FabModule } from '../share/fab/fab.module';
import { ModalModule } from '../share/modal/modal.module';
import { SequenceViewerModule } from '../share/sequence-viewer/sequence-viewer.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { TagEditorModule } from '../share/tag-editor/tag-editor.module';

@NgModule({
  declarations: [
    SequencesComponent,
    SequenceItemListComponent,
    SequenceGhostItemListComponent,
    SequenceComponent
  ],
  imports: [
    CommonModule,

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
