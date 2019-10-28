import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-experiment-type',
  templateUrl: './experiment-type.component.html',
  styleUrls: ['./experiment-type.component.sass']
})
export class ExperimentTypeComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute) { }

  private _handleRouteParams(params: Params) {
    const experimentType = params['type'];
    const experimentId = params['id'] || '';

    console.log('Zobrazuji experiment typu: ' + experimentType);
    console.log('S ID: ' + experimentId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._handleRouteParams(params);
    });
  }

}
