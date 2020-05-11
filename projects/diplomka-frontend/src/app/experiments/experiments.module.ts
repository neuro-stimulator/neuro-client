import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng5SliderModule } from 'ng5-slider';
import { TranslateModule } from '@ngx-translate/core';

import { Experiment } from '@stechy1/diplomka-share';

import { ModalModule } from 'stim-lib-modal';
import { FabModule } from 'stim-lib-fab';
import { ListUtilsModule } from 'stim-lib-list-utils';

import { ShareModule } from '../share/share.module';
import { AudioPlayerModule } from '../share/audio-player/audio-player.module';
import { ImagePlayerModule } from '../share/image-player/image-player.module';
import { ListButtonsAddonModule } from '../share/list-buttons-addon/list-buttons-addon.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import { ExperimentsComponent } from './experiments.component';
import { ExperimentItemListComponent } from './experiment-item-list/experiment-item-list.component';
import { ExperimentGhostItemListComponent } from './experiment-ghost-item-list/experiment-ghost-item-list.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentTypeErpComponent } from './experiment-type/experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeNoneComponent } from './experiment-type/experiment-type-none/experiment-type-none.component';
import { ExperimentTypeCvepComponent } from './experiment-type/experiment-type-cvep/experiment-type-cvep.component';
import { ExperimentTypeFvepComponent } from './experiment-type/experiment-type-fvep/experiment-type-fvep.component';
import { ExperimentTypeTvepComponent } from './experiment-type/experiment-type-tvep/experiment-type-tvep.component';
import { ExperimentTypeReaComponent } from './experiment-type/experiment-type-rea/experiment-type-rea.component';
import { ExperimentTypeHeaderComponent } from './experiment-type/experiment-type-header/experiment-type-header.component';
import { ExperimentTypeErpOutputComponent } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output.component';
import { ExperimentTypeErpOutputCountPipe } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output-count.pipe';
import { ExperimentTypeErpOutputDependencyPipe } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output-dependency.pipe';
import { ExperimentTypeTvepOutputComponent } from './experiment-type/experiment-type-tvep/experiment-type-tvep-output/experiment-type-tvep-output.component';
import { ExperimentTypeTvepOutputCountPipe } from './experiment-type/experiment-type-tvep/experiment-type-tvep-output/experiment-type-tvep-output-count.pipe';
import { OutputPatternComponent } from './experiment-type/output-pattern/output-pattern.component';
import { ExperimentTypeFvepOutputComponent } from './experiment-type/experiment-type-fvep/experiment-type-fvep-output/experiment-type-fvep-output.component';
import { ExperimentTypeFvepOutputCountPipe } from './experiment-type/experiment-type-fvep/experiment-type-fvep-output/experiment-type-tvep-output-count.pipe';
import { OutputTypeComponent } from './experiment-type/output-type/output-type.component';
import { ExperimentsFilterDialogComponent } from './experiments-filter-dialog/experiments-filter-dialog.component';
import { TagEditorModule } from '../share/tag-editor/tag-editor.module';
import { DropdownBtnModule } from '../share/dropdown-btn/dropdown-btn.module';
import { SequenceFastDialogComponent } from './experiment-type/experiment-type-erp/sequence-fast-dialog/sequence-fast-dialog.component';
import { ExperimentsActivate } from './experiments.activate';
import { ExperimentsPageToolsComponent } from './experiments-page-tools/experiments-page-tools.component';
import { SettingsModule } from '../settings/settings.module';
import { ExperimentsDeactivate } from './experiments.deactivate';
import { GROUP_BY_FILTERS, SORT_BY_FILTERS } from './experiments-filter-parameters';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentItemListComponent,
    ExperimentGhostItemListComponent,
    ExperimentTypeComponent,
    ExperimentTypeErpComponent,
    ExperimentTypeNoneComponent,
    ExperimentTypeCvepComponent,
    ExperimentTypeFvepComponent,
    ExperimentTypeTvepComponent,
    ExperimentTypeReaComponent,
    ExperimentTypeHeaderComponent,
    ExperimentTypeErpOutputComponent,
    ExperimentTypeErpOutputCountPipe,
    ExperimentTypeErpOutputDependencyPipe,
    ExperimentTypeTvepOutputComponent,
    ExperimentTypeTvepOutputCountPipe,
    OutputPatternComponent,
    ExperimentTypeFvepOutputComponent,
    ExperimentTypeFvepOutputCountPipe,
    OutputTypeComponent,
    ExperimentsFilterDialogComponent,
    SequenceFastDialogComponent,
    ExperimentsPageToolsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TranslateModule.forChild(),

    Ng5SliderModule,
    ShareModule,
    ModalModule,
    FabModule,
    ExperimentsRoutingModule,
    AudioPlayerModule,
    ImagePlayerModule,
    TagEditorModule,
    DropdownBtnModule,
    SettingsModule,
    FabModule,
    ListButtonsAddonModule,
    ListUtilsModule.forChild<Experiment>({
      storageSuffix: 'experiments',
      fuseKeys: ['name', 'tag'],
      groupBy: GROUP_BY_FILTERS,
      sortBy: SORT_BY_FILTERS
    })
  ],
  providers: [
    ExperimentsActivate,
    ExperimentsDeactivate
  ]
})
export class ExperimentsModule {

}
