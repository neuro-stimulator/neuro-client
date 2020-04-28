import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';
import { ExperimentGroup } from '../experiments.share';
import { Settings } from '../../settings/settings';
import { SettingsService } from '../../settings/settings.service';

@Component({
  selector: 'app-experiment-item-list',
  templateUrl: './experiment-item-list.component.html',
  styleUrls: ['./experiment-item-list.component.sass']
})
export class ExperimentItemListComponent implements OnInit {

  @Input() experimentGroups: ExperimentGroup;
  @Output() run: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() simulate: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() edit: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() delete: EventEmitter<Experiment> = new EventEmitter<Experiment>();

  ExperimentType = ExperimentType;

  // dateTimeFormat: DateTimeFormat = {showDays: true, showMonths: true, showYears: true};
  settings: Settings;

  constructor(private readonly _service: SettingsService) {
    this.settings = this._service.settings;
  }

  ngOnInit(): void {}

}
