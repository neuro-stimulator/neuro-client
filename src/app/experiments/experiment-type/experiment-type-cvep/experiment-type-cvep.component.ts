import { Component, OnInit } from '@angular/core';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-type-cvep',
  templateUrl: './experiment-type-cvep.component.html',
  styleUrls: ['./experiment-type-cvep.component.sass']
})
export class ExperimentTypeCvepComponent extends BaseExperimentTypeComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
