import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { Experiment, Output } from '@stechy1/diplomka-share';

import { StimLibUiModule } from '@diplomka-frontend/stim-lib-ui';
import { StimLibListUtilsModule } from '@diplomka-frontend/stim-lib-list-utils';
import { StimFeatureExperimentsDomainModule } from '@diplomka-frontend/stim-feature-experiments/domain';
import { StimFeatureSettingsFeatureParamConfigExperimentsModule } from '@diplomka-frontend/stim-feature-settings/feature/param-config/experiments';

import { ExperimentsComponent } from './experiments.component';
import { ExperimentsItemListComponent } from './experiment-item-list/experiments-item-list.component';
import { ExperimentsGhostItemListComponent } from './experiment-ghost-item-list/experiments-ghost-item-list.component';
import { ExperimentTypeComponent } from './experiment-type/experiment-type.component';
import { ExperimentTypeNoneComponent } from './experiment-type/experiment-type-none/experiment-type-none.component';
import { ExperimentTypeErpComponent } from './experiment-type/experiment-type-erp/experiment-type-erp.component';
import { ExperimentTypeErpOutputComponent } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output.component';
import { ExperimentTypeErpOutputCountPipe } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output-count.pipe';
import { ExperimentTypeErpOutputDependencyPipe } from './experiment-type/experiment-type-erp/experiment-type-erp-output/experiment-type-erp-output-dependency.pipe';
import { ExperimentTypeCvepComponent } from './experiment-type/experiment-type-cvep/experiment-type-cvep.component';
import { ExperimentTypeCvepOutputComponent } from './experiment-type/experiment-type-cvep/experiment-type-cvep-output/experiment-type-cvep-output.component';
import { ExperimentTypeCvepOutputCountPipe } from './experiment-type/experiment-type-cvep/experiment-type-cvep-output/experiment-type-cvep-output-count.pipe';
import { ExperimentTypeFvepComponent } from './experiment-type/experiment-type-fvep/experiment-type-fvep.component';
import { ExperimentTypeFvepOutputComponent } from './experiment-type/experiment-type-fvep/experiment-type-fvep-output/experiment-type-fvep-output.component';
import { ExperimentTypeFvepOutputCountPipe } from './experiment-type/experiment-type-fvep/experiment-type-fvep-output/experiment-type-tvep-output-count.pipe';
import { ExperimentTypeTvepComponent } from './experiment-type/experiment-type-tvep/experiment-type-tvep.component';
import { ExperimentTypeTvepOutputComponent } from './experiment-type/experiment-type-tvep/experiment-type-tvep-output/experiment-type-tvep-output.component';
import { ExperimentTypeTvepOutputCountPipe } from './experiment-type/experiment-type-tvep/experiment-type-tvep-output/experiment-type-tvep-output-count.pipe';
import { ExperimentTypeReaComponent } from './experiment-type/experiment-type-rea/experiment-type-rea.component';
import { ExperimentTypeHeaderComponent } from './experiment-type/experiment-type-header/experiment-type-header.component';
import { OutputPatternComponent } from './experiment-type/output-pattern/output-pattern.component';
import { OutputTypeComponent } from './experiment-type/output-type/output-type.component';
import { ExperimentsFilterDialogComponent } from './experiments-filter-dialog/experiments-filter-dialog.component';
import { SequenceFastDialogComponent } from './experiment-type/experiment-type-erp/sequence-fast-dialog/sequence-fast-dialog.component';
import { ExperimentsPageToolsComponent } from './experiments-page-tools/experiments-page-tools.component';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import {
  GROUP_BY_FILTERS,
  SORT_BY_FILTERS,
} from './experiments-filter-parameters';
import { ExperimentsActivate } from './experiments.activate';
import { ExperimentsDeactivate } from './experiments.deactivate';
import { ExperimentTypeResolverDirective } from './experiment-type-resolver.directive';
import { StimFeatureSequencesDomainModule } from '@diplomka-frontend/stim-feature-sequences/domain';
import { StimFeatureFileBrowserFeatureModule } from '@diplomka-frontend/stim-feature-file-browser/feature';
import { OutputEditorComponent } from './experiment-type/output-type/output-editor/output-editor.component';

@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentsItemListComponent,
    ExperimentsGhostItemListComponent,
    ExperimentTypeComponent,
    ExperimentTypeErpComponent,
    ExperimentTypeNoneComponent,
    ExperimentTypeCvepComponent,
    ExperimentTypeCvepOutputComponent,
    ExperimentTypeCvepOutputCountPipe,
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
    ExperimentTypeResolverDirective,
    OutputEditorComponent,
  ],
  imports: [
    ReactiveFormsModule,

    TranslateModule,

    StimLibUiModule,
    ExperimentsRoutingModule,
    StimFeatureSettingsFeatureParamConfigExperimentsModule,
    StimLibListUtilsModule.forChild<Experiment<Output>>({
      storageSuffix: 'experiments',
      fuseKeys: ['name', 'tag'],
      groupBy: GROUP_BY_FILTERS,
      sortBy: SORT_BY_FILTERS,
    }),
    StimFeatureExperimentsDomainModule,
    StimFeatureFileBrowserFeatureModule,
    StimFeatureSequencesDomainModule,
  ],
  providers: [ExperimentsActivate, ExperimentsDeactivate],
})
export class StimFeatureExperimentsFeatureModule {}
