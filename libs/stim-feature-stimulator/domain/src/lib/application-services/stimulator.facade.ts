import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";

import * as ConnectionActions from '@diplomka-frontend/stim-lib-connection';

import * as StimulatorActions from '../store/stimulator.actions';
import * as fromStimulator from '../store/stimulator.state';
import { StimulatorStateType } from "../domain/stimulator-state";

@Injectable()
export class StimulatorFacade {

  constructor(private readonly store: Store<fromStimulator.StimulatorState>) {}


  public discover() {
    this.store.dispatch(StimulatorActions.actionStimulatorDiscover({}));
  }
  public connect(path: string) {
    this.store.dispatch(ConnectionActions.actionStimulatorConnectRequest({ path }));
  }
  public disconnect() {
    this.store.dispatch(ConnectionActions.actionStimulatorDisconnectRequest({}));
  }
  public status() {
    this.store.dispatch(ConnectionActions.actionStimulatorConnectionStatusRequest({}));
  }
  public updateFirmware(firmware: Blob) {
    this.store.dispatch(StimulatorActions.actionStimulatorFirmwareUpdateRequest({ firmware }));
  }

  /*  ---------------   Commands ---------------- */
  public reboot() {
    this.store.dispatch(StimulatorActions.actionCommandRebootRequest({}));
  }
  public requestStimulatorState() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorStateRequest({}));
  }
  public experimentRun(experimentID: number) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorRunRequest({ experimentID }));
  }
  public experimentPause(experimentID: number) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorPauseRequest({ experimentID }));
  }
  public experimentFinish(experimentID: number) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorFinishRequest({ experimentID }));
  }
  public experimentUpload(experimentID: number) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorUploadRequest({ experimentID }));
  }
  public experimentSetup(experimentID: number) {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorSetupRequest({ experimentID }));
  }
  public experimentClear() {
    this.store.dispatch(StimulatorActions.actionCommandStimulatorClearRequest({}));
  }

  get stimulatorState(): Observable<StimulatorStateType> {
    return this.store.select("stimulatorState");
  }
}
