import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-param-config',
  templateUrl: './param-config.component.html',
  styleUrls: ['./param-config.component.sass']
})
export class ParamConfigComponent implements OnInit {

  form: FormGroup = new FormGroup({
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

  constructor(private readonly _service: SettingsService,
              private readonly _toastr: ToastrService) { }

  ngOnInit() {
    this.form.setValue(this._service.settings);
    this._service.loadServerSettings()
        .then(serverSettings => {
          this.server.patchValue(serverSettings);
        });
  }

  handleSaveSettings() {
    this._service.settings = this.form.value;
    this._service.uploadServerSettings(this.server.value).finally();
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
