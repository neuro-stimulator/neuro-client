import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { SettingsFacade, SettingsState } from '@diplomka-frontend/stim-feature-settings/domain';
import { ParamConfigExperimentsComponent } from '@diplomka-frontend/stim-feature-settings/feature/param-config/experiments';
import { ParamConfigServerComponent } from '@diplomka-frontend/stim-feature-settings/feature/param-config/server';
import { ParamConfigApplicationComponent } from '@diplomka-frontend/stim-feature-settings/feature/param-config/application';
import { AliveCheckerFacade, ConnectionInformationState } from '@diplomka-frontend/stim-lib-connection';

@Component({
  selector: 'stim-feature-settings-param-config',
  templateUrl: './param-config.component.html',
  styleUrls: ['./param-config.component.sass'],
})
export class ParamConfigComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  form: FormGroup = new FormGroup({
    application: ParamConfigApplicationComponent.createForm(),
    experiments: ParamConfigExperimentsComponent.createForm(),
    player: new FormGroup({}),
    results: new FormGroup({}),
  });
  server: FormGroup = ParamConfigServerComponent.createForm();

  private _originalLanguage: string;

  constructor(private readonly _service: SettingsFacade, private readonly _connection: AliveCheckerFacade, private readonly _toastr: ToastrService) {}

  ngOnInit() {
    this._service.state
      .pipe(
        take(1), // Díky funkci take
        tap((state: SettingsState) => {
          this.form.setValue(state.localSettings);
          this.server.patchValue(state.serverSettings);
        })
      )
      .subscribe(); // Nemusím ukládat subscription
  }

  handleSaveSettings() {
    this._service.localSettings = this.form.value;
    this._service.serverSettings = this.server.value;
    //   this._service.settings = this.form.value;
    //   this._service.uploadServerSettings(this.server.value).then();
    //   if (this._service.settings.application.language !== this._originalLanguage) {
    //     this.modal.showComponent = InformDialogComponent;
    //     this.modal.open({
    //       message: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.CHANGE_LANGUAGE_INFORMATION'
    //     });
    //   }
  }

  get application(): FormGroup {
    return this.form.get('application') as FormGroup;
  }

  get experiments(): FormGroup {
    return this.form.get('experiments') as FormGroup;
  }

  get player(): FormGroup {
    return this.form.get('player') as FormGroup;
  }

  get results(): FormGroup {
    return this.form.get('results') as FormGroup;
  }

  get settingsState(): Observable<SettingsState> {
    return this._service.state;
  }

  get connectionState(): Observable<ConnectionInformationState> {
    return this._connection.state;
  }
}
