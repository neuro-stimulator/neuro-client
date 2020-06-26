import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  MessageCodes,
  ResponseObject,
  SocketMessage,
  SocketMessageSpecialization,
  SocketMessageType,
  StimulatorDataStateMessage,
  StimulatorStateEvent,
} from '@stechy1/diplomka-share';
import * as ConnectionActions from '@diplomka-frontend/stim-lib-connection';

import { StimulatorService } from '../infrastructure/stimulator.service';
import * as StimulatorActions from './stimulator.actions';
import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class StimulatorEffects {
  constructor(
    private readonly _service: StimulatorService,
    private readonly _facade: ExperimentsFacade,
    private readonly actions$: Actions
  ) {}

  discover$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionStimulatorDiscoverRequest),
      switchMap(() => {
        return this._service.discover().pipe(
          map((response: { data: [{ path: string }] }) => {
            // TODO error handling
            return StimulatorActions.actionStimulatorDiscoverDone(response);
          })
        );
      })
    )
  );
  open$ = createEffect(() =>
    this.actions$.pipe(
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
    )
  );
  close$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionActions.actionStimulatorDisconnectRequest),
      switchMap(() => {
        return this._service.close().pipe(
          map((response) => {
            return ConnectionActions.actionStimulatorDisconnected({});
          })
        );
      })
    )
  );
  connectionStatus$ = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  updateFirmware$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionStimulatorFirmwareUpdateRequest),
      switchMap((action) => {
        return this._service.updateFirmware(action.path).pipe(
          map(() => {
            return StimulatorActions.actionStimulatorFirmwareUpdateDone({});
          })
        );
      })
    )
  );

  reboot$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StimulatorActions.actionCommandRebootRequest),
        switchMap(() => {
          return this._service.reboot();
        })
      ),
    { dispatch: false }
  );

  state$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorStateRequest),
      switchMap(() => {
        return this._service.stimulatorState().pipe(
          map((response: ResponseObject<StimulatorStateEvent | undefined>) => {
            if (response.data) {
              return StimulatorActions.actionCommandStimulatorStateRequestDone({
                state: response.data.state,
              });
            } else {
              return StimulatorActions.actionCommandStimulatorStateRequestFail(
                {}
              );
            }
          })
        );
      })
    )
  );

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorUploadRequest),
      withLatestFrom(this._facade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .experimentUpload(experimentState.selectedExperiment.experiment.id)
          .pipe(
            mergeMap((res: ResponseObject<any>) => {
              if (res.message.code === MessageCodes.CODE_SUCCESS) {
                return [
                  StimulatorActions.actionCommandStimulatorUploadRequestDone(
                    {}
                  ),
                  StimulatorActions.actionCommandStimulatorSetupRequest({}),
                ];
              }
              return [
                StimulatorActions.actionCommandStimulatorSetupRequestFail({}),
              ];
            })
          );
      })
    )
  );

  setup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorSetupRequest),
      withLatestFrom(this._facade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .experimentSetup(experimentState.selectedExperiment.experiment.id)
          .pipe(
            map((response: ResponseObject<any>) => {
              const code = response?.message.code;
              if (code === MessageCodes.CODE_SUCCESS) {
                return StimulatorActions.actionCommandStimulatorSetupRequestDone(
                  {}
                );
              } else {
                return StimulatorActions.actionCommandStimulatorSetupRequestFail(
                  {}
                );
              }
            })
          );
      })
    )
  );

  run$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorRunRequest),
      withLatestFrom(this._facade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .experimentRun(experimentState.selectedExperiment.experiment.id)
          .pipe(
            map((response: ResponseObject<any>) => {
              const code = response?.message.code;
              if (code === MessageCodes.CODE_SUCCESS) {
                return StimulatorActions.actionCommandStimulatorRunRequestDone(
                  {}
                );
              } else {
                return StimulatorActions.actionCommandStimulatorRunRequestFail(
                  {}
                );
              }
            })
          );
      })
    )
  );

  pause$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorPauseRequest),
      withLatestFrom(this._facade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .experimentPause(experimentState.selectedExperiment.experiment.id)
          .pipe(
            map((response: ResponseObject<any>) => {
              const code = response?.message.code;
              if (code === MessageCodes.CODE_SUCCESS) {
                return StimulatorActions.actionCommandStimulatorPauseRequestDone(
                  {}
                );
              } else {
                return StimulatorActions.actionCommandStimulatorPauseRequestFail(
                  {}
                );
              }
            })
          );
      })
    )
  );

  finish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorFinishRequest),
      withLatestFrom(this._facade.state),
      switchMap(([action, experimentState]) => {
        return this._service
          .experimentFinish(experimentState.selectedExperiment.experiment.id)
          .pipe(
            map((response: ResponseObject<any>) => {
              const code = response?.message.code;
              if (code === MessageCodes.CODE_SUCCESS) {
                return StimulatorActions.actionCommandStimulatorFinishRequestDone(
                  {}
                );
              } else {
                return StimulatorActions.actionCommandStimulatorFinishRequestFail(
                  {}
                );
              }
            })
          );
      })
    )
  );

  clear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StimulatorActions.actionCommandStimulatorClearRequest),
      switchMap((action) => {
        return this._service.experimentClear().pipe(
          map((response: ResponseObject<any>) => {
            const code = response?.message.code;
            if (code === MessageCodes.CODE_SUCCESS) {
              return StimulatorActions.actionCommandStimulatorClearRequestDone(
                {}
              );
            } else {
              return StimulatorActions.actionCommandStimulatorClearRequestFail(
                {}
              );
            }
          })
        );
      })
    )
  );

  stimulatorState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionActions.actionSocketData),
      map((action) => action.data as SocketMessage),
      tap((message: SocketMessage) => {
        console.log(message);
      }),
      filter(
        (message: SocketMessage) =>
          message.specialization === SocketMessageSpecialization.STIMULATOR
      ),
      map((message: SocketMessage) => {
        switch (message.type) {
          case SocketMessageType.STIMULATOR_DATA_STATE:
            const stimulatorDataStateMessage = message as StimulatorDataStateMessage;
            return StimulatorActions.actionCommandStimulatorStateRequestDone({
              state: stimulatorDataStateMessage.data.state,
            });
          default:
            return StimulatorActions.actionStimulatorNoop({});
        }
      })
    )
  );
}
