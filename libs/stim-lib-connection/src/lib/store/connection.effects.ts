import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AliveCheckerService } from "../infrastructure/alive-checker.service";
import * as ConnectionActions from './connection.actions';

@Injectable()
export class ConnectionEffects {

  constructor(private readonly _service: AliveCheckerService,
              private readonly actions$: Actions) {}

  $serverConnect = createEffect(() => this.actions$.pipe(
    ofType(ConnectionActions.actionServerConnectRequest),
    tap(() => {
      this._service.requestConnect();
    })
  ), { dispatch: false});

  $serverDisconnect = createEffect(() => this.actions$.pipe(
    ofType(ConnectionActions.actionServerDisconnectRequest),
    tap(() => {
      this._service.requestDisconnect();
    })
  ), { dispatch: false});


}
