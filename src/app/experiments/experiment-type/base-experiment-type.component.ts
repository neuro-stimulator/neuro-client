import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

export abstract class BaseExperimentTypeComponent implements OnInit {

  private _experimentId: number;

  protected constructor(protected readonly route: ActivatedRoute) {}

  private _handleRouteParams(params: Params) {
    this._experimentId = params['id'];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._handleRouteParams(params);
    });
  }

  protected get experimentId(): number {
    return this._experimentId;
  }

}
