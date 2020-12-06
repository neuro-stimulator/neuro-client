import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { FileRecord, ConnectionStatus } from '@stechy1/diplomka-share';

import { StimulatorFacade, StimulatorState } from '@diplomka-frontend/stim-feature-stimulator/domain';
import { AliveCheckerFacade, ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';
import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { FileBrowserComponent } from '@diplomka-frontend/stim-feature-file-browser/feature';

@Component({
  selector: 'stim-feature-settings-service-state',
  templateUrl: './service-state.component.html',
  styleUrls: ['./service-state.component.sass'],
})
export class ServiceStateComponent {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  public ConnectionStatus = ConnectionStatus;

  constructor(private readonly _service: StimulatorFacade, private readonly _aliveChecker: AliveCheckerFacade) {}

  handleRequestServerConnect() {
    this._aliveChecker.requestConnect();
  }

  handleRequestServerDisconnect() {
    this._aliveChecker.requestDisconnect();
  }

  handleDiscover() {
    this._service.discover();
  }

  handleClearDiscovered() {
    this._service.clearDiscovered();
  }

  handleOpen(path: string) {
    this._service.connect(path);
  }

  handleStop() {
    this._service.disconnect();
  }

  handleUpdateStimulatorFirmware() {
    this.modal.showComponent = FileBrowserComponent;
    this.modal
      .openForResult<void, FileRecord>()
      .then((fileRecord: FileRecord) => {
        this._service.updateFirmware(fileRecord.path);
      })
      .catch((e) => {
        // Dialog was closed
        console.log(e);
      });
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._aliveChecker.state;
  }

  get stimulatorState(): Observable<StimulatorState> {
    return this._service.stimulatorState;
  }
}
