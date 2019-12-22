import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperimentResult, ExperimentType } from 'diplomka-share';

@Component({
  selector: 'app-experiment-result-item-list',
  templateUrl: './experiment-result-item-list.component.html',
  styleUrls: ['./experiment-result-item-list.component.sass']
})
export class ExperimentResultItemListComponent implements OnInit {

  @Input() experimentResults: Observable<ExperimentResult[]>;
  @Output() view: EventEmitter<ExperimentResult> = new EventEmitter<ExperimentResult>();
  @Output() delete: EventEmitter<ExperimentResult> = new EventEmitter<ExperimentResult>();

  ExperimentType = ExperimentType;

  constructor() { }

  ngOnInit() {
    this.experimentResults.subscribe(value => {
      console.log(value);
    });
  }

  handleView(experimentResult: ExperimentResult) {
    this.view.next(experimentResult);
  }

  handleDelete(experimentResult: ExperimentResult) {
    this.delete.next(experimentResult);
  }
}
