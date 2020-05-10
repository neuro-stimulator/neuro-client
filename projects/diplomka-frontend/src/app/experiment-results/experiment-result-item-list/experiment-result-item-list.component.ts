import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExperimentResult, ExperimentType } from '@stechy1/diplomka-share';

import { EntityGroup } from 'stim-lib-list-utils';

@Component({
  selector: 'stim-experiment-result-item-list',
  templateUrl: './experiment-result-item-list.component.html',
  styleUrls: ['./experiment-result-item-list.component.sass']
})
export class ExperimentResultItemListComponent implements OnInit {

  @Input() experimentResultGroups: EntityGroup<ExperimentResult>;
  @Output() view: EventEmitter<ExperimentResult> = new EventEmitter<ExperimentResult>();
  @Output() delete: EventEmitter<ExperimentResult> = new EventEmitter<ExperimentResult>();

  ExperimentType = ExperimentType;

  constructor() { }

  ngOnInit() {}

  handleView(experimentResult: ExperimentResult) {
    this.view.next(experimentResult);
  }

  handleDelete(experimentResult: ExperimentResult) {
    this.delete.next(experimentResult);
  }
}
