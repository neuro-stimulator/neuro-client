import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

import { DateTimeFormat } from '@diplomka-frontend/stim-lib-common';
import {
  EntityGroup,
  SelectedEntities,
} from '@diplomka-frontend/stim-lib-list-utils';
import {
  SettingsFacade,
  SettingsState,
} from '@diplomka-frontend/stim-feature-settings/domain';

@Component({
  selector: 'stim-feature-experiments-item-list',
  templateUrl: './experiments-item-list.component.html',
  styleUrls: ['./experiments-item-list.component.sass'],
})
export class ExperimentsItemListComponent implements OnInit {
  @Input() experimentGroups: EntityGroup<Experiment>;
  @Input() selectedExperiments: SelectedEntities;
  @Input() selectionMode: boolean;
  @Output() run: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() simulate: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() edit: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() delete: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() select: EventEmitter<Experiment> = new EventEmitter<Experiment>();

  ExperimentType = ExperimentType;

  constructor(private readonly _service: SettingsFacade) {}

  ngOnInit(): void {}

  get settings(): Observable<SettingsState> {
    return this._service.state;
  }

  handleExperimentIconClick(experiment: Experiment) {
    if (this.selectionMode) {
      return;
    }

    this.select.emit(experiment);
  }
}
