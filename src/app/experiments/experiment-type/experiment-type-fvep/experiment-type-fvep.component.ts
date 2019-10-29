import { Component, OnInit } from '@angular/core';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-type-fvep',
  templateUrl: './experiment-type-fvep.component.html',
  styleUrls: ['./experiment-type-fvep.component.sass']
})
export class ExperimentTypeFvepComponent extends BaseExperimentTypeComponent implements OnInit {

  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
