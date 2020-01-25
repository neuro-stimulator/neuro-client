import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ModalComponent } from '../../share/modal/modal.component';
import { SettingsService } from '../settings.service';
import { ConfirmDialogComponent } from '../../share/modal/confirm/confirm-dialog.component';
import { InformDialogComponent } from '../../share/modal/inform/inform-dialog.component';

@Component({
  selector: 'app-param-config',
  templateUrl: './param-config.component.html',
  styleUrls: ['./param-config.component.sass']
})
export class ParamConfigComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  form: FormGroup = new FormGroup({
    application: new FormGroup({
      language: new FormControl(null, [Validators.required]),
    }),
    experiments: new FormGroup({
      showDescription: new FormControl(null),
      showTags: new FormControl(null),
      showCreationDate: new FormControl(null),
      showOutputType: new FormControl(null),
      showOutputCount: new FormControl(null),
      creationDateFormat: new FormGroup({
        showYears: new FormControl(null),
        showMonths: new FormControl(null),
        showDays: new FormControl(null),
        showHours: new FormControl(null),
        showMinutes: new FormControl(null),
        showSeconds: new FormControl(null),
        showMiliseconds: new FormControl(null),
      })
    }),
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
        .then(serverSettings => {
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
