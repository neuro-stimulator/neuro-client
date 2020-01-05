import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { Experiment, ExperimentType } from '@stechy1/diplomka-share';

@Component({
  selector: 'app-experiment-item-list',
  templateUrl: './experiment-item-list.component.html',
  styleUrls: ['./experiment-item-list.component.sass']
})
export class ExperimentItemListComponent implements OnInit {

  @Input() experiments: Experiment[];
  @Output() run: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() simulate: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() edit: EventEmitter<Experiment> = new EventEmitter<Experiment>();
  @Output() delete: EventEmitter<Experiment> = new EventEmitter<Experiment>();

  ExperimentType = ExperimentType;

  constructor() {}

  ngOnInit() {}

  handleRun(experiment: Experiment) {
    this.run.next(experiment);
  }

  handleSimulate(experiment: Experiment) {
    this.simulate.next(experiment);
  }

  handleEdit(experiment: Experiment) {
    this.edit.next(experiment);
  }

  handleDelete(experiment: Experiment) {
    this.delete.next(experiment);
  }
}
