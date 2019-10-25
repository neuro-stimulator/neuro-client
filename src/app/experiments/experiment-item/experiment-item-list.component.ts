import { Component, Input, OnInit } from '@angular/core';
import { Experiment } from 'diplomka-share';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experiment-item-list',
  templateUrl: './experiment-item-list.component.html',
  styleUrls: ['./experiment-item-list.component.sass']
})
export class ExperimentItemListComponent implements OnInit {

  @Input() experiments: Observable<Experiment[]>;

  constructor() { }

  ngOnInit() {
  }

}
