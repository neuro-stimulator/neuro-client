import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfirmDialogArgs, ConfirmDialogComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { SettingsFacade } from '@diplomka-frontend/stim-feature-settings/domain';
import { AssetPlayerFacade } from '@diplomka-frontend/stim-lib-asset-player';
import { AliveCheckerFacade } from '@diplomka-frontend/stim-lib-connection';

@Component({
  selector: 'stim-feature-settings-param-config-server',
  templateUrl: './param-config-server.component.html',
  styleUrls: ['./param-config-server.component.sass'],
})
export class ParamConfigServerComponent {
  public readonly baudrates = [115200, 57600, 38400, 19200, 9600, 4800, 2400, 1800, 1200, 600, 300, 200, 150, 134, 110, 75, 50];
  public readonly dataBits = [8, 7, 6, 5];
  public readonly stopBits = [1, 2];
  public readonly paritys = ['none', 'even', 'mark', 'odd', 'space'];

  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() form: FormGroup;

  public static createForm(): FormGroup {
    return new FormGroup({
      autoconnectToStimulator: new FormControl(),
      serial: new FormGroup({
        baudRate: new FormControl(null, Validators.required),
        dataBits: new FormControl(null),
        stopBits: new FormControl(null),
        parity: new FormControl(null),
      }),
      stimulatorResponseTimeout: new FormControl(null, Validators.min(500)),
      assetPlayer: new FormGroup({
        width: new FormControl(),
        height: new FormControl(),
        fullScreen: new FormControl(),
      }),
    });
  }

  constructor(private readonly facade: SettingsFacade, private readonly assetPlayerFacade: AssetPlayerFacade, private readonly aliveFacade: AliveCheckerFacade) {}

  public handleSeedDatabase() {
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open<ConfirmDialogArgs>({
      message: 'SETTINGS.PARAM_CONFIG.SERVER.DANGER_ZONE.DIALOGS.SEED.QUESTION',
      confirm: () => {
        return this.facade.seedDatabase();
      },
    });
  }

  public handleTruncateDatabase() {
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open<ConfirmDialogArgs>({
      message: 'SETTINGS.PARAM_CONFIG.SERVER.DANGER_ZONE.DIALOGS.TRUNCATE.QUESTION',
      confirm: () => {
        return this.facade.truncateDatabase();
      },
    });
  }

  public handleSpawnAssetPlayer() {
    this.assetPlayerFacade.spawn();
  }

  public handleKillAssetPlayer() {
    this.assetPlayerFacade.kill();
  }

  get stimulatorResponseTimeout() {
    return this.form.get('stimulatorResponseTimeout');
  }

  get spawnAssetPlayerDisabled(): Observable<boolean> {
    return zip(this.assetPlayerFacade.disconnected, this.assetPlayerFacade.ipcClosed, this.aliveFacade.serverConnected).pipe(
      map(([disconnected, closed, serverConnected]: [boolean, boolean, boolean]) => !serverConnected || !disconnected || closed)
    );
  }

  get killAssetPlayerDisabled(): Observable<boolean> {
    return this.assetPlayerFacade.connected.pipe(map((value) => !value));
  }
}
