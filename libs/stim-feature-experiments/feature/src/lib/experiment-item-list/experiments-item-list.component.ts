import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Experiment, ExperimentType, Output as ExpOutput } from '@stechy1/diplomka-share';

import { EntityGroup, SelectedEntities } from '@neuro-client/stim-lib-list-utils';
import { SettingsFacade, SettingsState } from '@neuro-client/stim-feature-settings/domain';

@Component({
  selector: 'stim-feature-experiments-item-list',
  templateUrl: './experiments-item-list.component.html',
  styleUrls: ['./experiments-item-list.component.sass'],
})
export class ExperimentsItemListComponent {
  @Input() experimentGroups: EntityGroup<Experiment<ExpOutput>>;
  @Input() selectedExperiments: SelectedEntities;
  @Input() selectionMode: boolean;
  @Output() run: EventEmitter<Experiment<ExpOutput>> = new EventEmitter<Experiment<ExpOutput>>();
  @Output() simulate: EventEmitter<Experiment<ExpOutput>> = new EventEmitter<Experiment<ExpOutput>>();
  @Output() edit: EventEmitter<Experiment<ExpOutput>> = new EventEmitter<Experiment<ExpOutput>>();
  @Output() delete: EventEmitter<Experiment<ExpOutput>> = new EventEmitter<Experiment<ExpOutput>>();
  @Output() selectExperiment: EventEmitter<Experiment<ExpOutput>> = new EventEmitter<Experiment<ExpOutput>>();

  ExperimentType = ExperimentType;

  constructor(private readonly _service: SettingsFacade) {}

  get settings(): Observable<SettingsState> {
    return this._service.state;
  }

  handleExperimentIconClick(experiment: Experiment<ExpOutput>) {
    if (this.selectionMode) {
      return;
    }

    this.selectExperiment.emit(experiment);
  }
}
