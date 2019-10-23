import { Component, OnInit } from '@angular/core';
import { ExperimentsService } from './experiments.service';
import { Observable } from 'rxjs';
import { Experiment } from 'diplomka-share';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.sass']
})
export class ExperimentsComponent implements OnInit {

  experiments: Observable<Experiment[]>;

  constructor(private readonly _service: ExperimentsService) { }

  ngOnInit() {
    this.experiments = this._service.records;
    this._service.all();
  }

}
