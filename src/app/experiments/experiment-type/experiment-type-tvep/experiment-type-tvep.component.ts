import { Component, OnInit } from '@angular/core';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-type-tvep',
  templateUrl: './experiment-type-tvep.component.html',
  styleUrls: ['./experiment-type-tvep.component.sass']
})
export class ExperimentTypeTvepComponent extends BaseExperimentTypeComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
