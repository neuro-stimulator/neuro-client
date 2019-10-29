import { Component, OnInit } from '@angular/core';
import { BaseExperimentTypeComponent } from '../base-experiment-type.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-type-rea',
  templateUrl: './experiment-type-rea.component.html',
  styleUrls: ['./experiment-type-rea.component.sass']
})
export class ExperimentTypeReaComponent extends BaseExperimentTypeComponent implements OnInit {


  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
