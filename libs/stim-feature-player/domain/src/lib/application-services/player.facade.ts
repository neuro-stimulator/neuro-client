import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { StimulatorFacade } from "@diplomka-frontend/stim-feature-stimulator/domain";
import { AliveCheckerFacade, ConnectionStatus } from "@diplomka-frontend/stim-lib-connection";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PlayerFacade {

  private _experimentID: number;
  public readonly stimulatorOnline$: Observable<ConnectionStatus>;

  constructor(private readonly store: Store<any>,
              private readonly stimulator: StimulatorFacade,
              private readonly connections: AliveCheckerFacade) {
    this.stimulatorOnline$ = connections.state.pipe(
      map((connectionInformation) => connectionInformation.stimulator)
    );
  }

  public uploadExperiment() {
    this.stimulator.experimentUpload(this._experimentID);
  }
  public runExperiment() {
    this.stimulator.experimentRun(this._experimentID);
  }
  public pauseExperiment() {
    this.stimulator.experimentPause(this._experimentID);
  }
  public finishExperiment() {
    this.stimulator.experimentFinish(this._experimentID);
  }
  public clearExperiment() {
    this.stimulator.experimentClear();
  }

}
