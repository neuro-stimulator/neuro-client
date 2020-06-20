import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";

import { MessageCodes, ResponseObject, StimulatorStateEvent } from "@stechy1/diplomka-share";
import * as ConnectionActions from '@diplomka-frontend/stim-lib-connection';

import { StimulatorService } from "../infrastructure/stimulator.service";
import * as StimulatorActions from './stimulator.actions';

@Injectable()
export class StimulatorEffects {
  constructor(private readonly _service: StimulatorService,
              private readonly actions$: Actions) {}

  discover$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionStimulatorDiscoverRequest),
    switchMap(() => {
      return this._service.discover().pipe(
        map((response: {data: [{path: string}]}) => {
          // TODO error handling
          return StimulatorActions.actionStimulatorDiscoverDone(response);
        })
      );
    })
  ));
  open$ = createEffect(() => this.actions$.pipe(
    ofType(ConnectionActions.actionStimulatorConnectRequest),
    switchMap((action) => {
      return this._service.open(action.path).pipe(
        map((response: ResponseObject<any>) => {
          switch (response.message.code) {
            case MessageCodes.CODE_SUCCESS_LOW_LEVEL_PORT_OPPENED:
              return ConnectionActions.actionStimulatorConnected({});
            case MessageCodes.CODE_ERROR_LOW_LEVEL_PORT_NOT_OPPENED:
              return ConnectionActions.actionStimulatorConnected({});
            default:
              return ConnectionActions.actionStimulatorConnected({});
          }
        })
      );
    })
  ));
  close$ = createEffect(() => this.actions$.pipe(
    ofType(ConnectionActions.actionStimulatorDisconnectRequest),
    switchMap(() => {
      return this._service.close().pipe(
        map((response) => {
          return ConnectionActions.actionStimulatorDisconnected({});
        })
      );
    })
  ));
  connectionStatus$ = createEffect(() => this.actions$.pipe(
    ofType(ConnectionActions.actionStimulatorConnectionStatusRequest),
    switchMap(() => {
      return this._service.connectionStatus().pipe(
        map((response: ResponseObject<{ connected: boolean }>) => {
          return response.data.connected
            ? ConnectionActions.actionStimulatorConnected({})
            : ConnectionActions.actionStimulatorDisconnected({});
        })
      );
    })
  ));

  updateFirmware$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionStimulatorFirmwareUpdateRequest),
    switchMap((action) => {
      return this._service.updateFirmware(action.path).pipe(
        map(() => {
          return StimulatorActions.actionStimulatorFirmwareUpdateDone({});
        })
      );
    })
  ));


  reboot$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandRebootRequest),
    switchMap(() => {
      return this._service.reboot();
    })
  ), { dispatch: false });

  state$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorStateRequest),
    switchMap(() => {
      return this._service.stimulatorState().pipe(
        map((response: ResponseObject<StimulatorStateEvent|undefined>) => {
          if (response.data) {
            return StimulatorActions.actionCommandStimulatorStateRequestDone({ state: response.data.state });
          } else {
            return StimulatorActions.actionCommandStimulatorStateRequestFail({});
          }
        })
      )
    })
  ));

  upload$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorUploadRequest),
    switchMap((action) => {
      return this._service.experimentUpload(action.experimentID).pipe(
        map((res: { message?: any }) => {
          if (res && res.message && res.message.type !== 0) {
            return StimulatorActions.actionCommandStimulatorSetupRequest({experimentID: action.experimentID});
          }
          return StimulatorActions.actionCommandStimulatorStateRequestFail({});
        })
      );
    })
  ));

  setup$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorSetupRequest),
    switchMap((action) => {
      return this._service.experimentSetup(action.experimentID)
    })
  ), { dispatch: false });

  run$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorRunRequest),
    switchMap((action) => {
      return this._service.experimentRun(action.experimentID)
    })
  ), { dispatch: false });

  pause$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorPauseRequest),
    switchMap((action) => {
      return this._service.experimentPause(action.experimentID)
    })
  ), { dispatch: false });

  finish$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorFinishRequest),
    switchMap((action) => {
      return this._service.experimentFinish(action.experimentID)
    })
  ), { dispatch: false });

  clear$ = createEffect(() => this.actions$.pipe(
    ofType(StimulatorActions.actionCommandStimulatorClearRequest),
    switchMap((action) => {
      return this._service.experimentClear()
    })
  ), { dispatch: false });

}
