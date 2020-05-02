import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { InformDialogComponent, ModalComponent } from 'stim-lib-modal';

import { SettingsService } from '../settings.service';
import { ParamConfigExperimentsComponent } from './param-config-experiments/param-config-experiments.component';
import { ServerSettings } from '../settings';

@Component({
  selector: 'stim-param-config',
  templateUrl: './param-config.component.html',
  styleUrls: ['./param-config.component.sass']
})
export class ParamConfigComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  form: FormGroup = new FormGroup({
    application: new FormGroup({
      language: new FormControl(null, [Validators.required]),
      disableTutorial: new FormControl(null)
    }),
    experiments: ParamConfigExperimentsComponent.createForm(),
    player: new FormGroup({}),
    results: new FormGroup({})
  });
  server: FormGroup = new FormGroup({
    autoconnectToStimulator: new FormControl()
  });

  private _originalLanguage: string;

  constructor(private readonly _service: SettingsService,
              private readonly _toastr: ToastrService) { }

  ngOnInit() {
    this.form.setValue(this._service.settings);
    this._originalLanguage = this._service.settings.application.language;
    this._service.loadServerSettings()
        .then((serverSettings: ServerSettings) => {
          this.server.patchValue(serverSettings);
        });
  }

  handleSaveSettings() {
    this._service.settings = this.form.value;
    this._service.uploadServerSettings(this.server.value).finally();
    if (this._service.settings.application.language !== this._originalLanguage) {
      this.modal.showComponent = InformDialogComponent;
      this.modal.open({
        message: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.CHANGE_LANGUAGE_INFORMATION'
      });
    }
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

  get working(): Observable<boolean> {
    return this._service.working$;
  }
}
