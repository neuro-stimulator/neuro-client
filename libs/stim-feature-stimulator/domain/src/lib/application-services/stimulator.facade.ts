import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import * as ConnectionActions from '@diplomka-frontend/stim-lib-connection';

import * as StimulatorActions from '../store/stimulator.actions';
import * as fromStimulator from '../store/stimulator.reducer';
import { StimulatorState } from '../store/stimulator.state';

@Injectable()
export class StimulatorFacade {
  constructor(private readonly store: Store<StimulatorState>) {}

  public discover() {
    this.store.dispatch(StimulatorActions.actionStimulatorDiscoverRequest());
  }
  public clearDiscovered() {
    this.store.dispatch(StimulatorActions.actionStimulatorClearDiscovered());
  }
  public connect(path: string) {
    this.store.dispatch(ConnectionActions.actionStimulatorConnectRequest({ path }));
  }
  public disconnect() {
    this.store.dispatch(ConnectionActions.actionStimulatorDisconnectRequest());
  }
  public status() {
    this.store.dispatch(ConnectionActions.actionStimulatorConnectionStatusRequest());
  }
  public updateFirmware(path: string) {
    this.store.dispatch(StimulatorActions.actionStimulatorFirmwareUpdateRequest({ path }));
  }

  /*  ---------------   Commands ---------------- */
  public reboot() {
    this.store.dispatch(StimulatorActions.actionCommandRebootRequest());
  }
  public requestStimulatorState() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorStateRequest());
  }
  public experimentRun() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorRunRequest());
  }
  public experimentPause() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorPauseRequest());
  }
  public experimentFinish() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorFinishRequest({ force: false }));
  }
  public handleForceFinishExperiment() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorFinishRequest({ force: true }));
  }
  public experimentClear() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorClearRequest());
  }
  public setOutput(index: number, enabled: boolean) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorSetOutput({ index, enabled }));
  }

  get stimulatorState(): Observable<StimulatorState> {
    return this.store.select(fromStimulator.stimulatorFeature);
  }
}
