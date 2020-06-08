import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';
import { EntityGroup } from '@diplomka-frontend/stim-lib-list-utils';
import { DateTimeFormat } from "@diplomka-frontend/stim-lib-common";
import { SettingsFacade, SettingsState } from "@diplomka-frontend/stim-feature-settings/domain";
import { Observable } from "rxjs";

@Component({
  selector: 'stim-feature-experiments-item-list',
  templateUrl: './experiments-item-list.component.html',
  styleUrls: ['./experiments-item-list.component.sass']
})
export class ExperimentsItemListComponent implements OnInit {

  @Input() experimentGroups: EntityGroup<Experiment>;
  @Output() run: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() simulate: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() edit: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() delete: EventEmitter<Experiment> = new EventEmitter<Experiment>();

  ExperimentType = ExperimentType;

  dateTimeFormat: DateTimeFormat = {showDays: true, showMonths: true, showYears: true};
  // settings: Settings;
  //
  constructor(private readonly _service: SettingsFacade) {}

  ngOnInit(): void {}

  get settings(): Observable<SettingsState> {
    return this._service.state;
  }

}
