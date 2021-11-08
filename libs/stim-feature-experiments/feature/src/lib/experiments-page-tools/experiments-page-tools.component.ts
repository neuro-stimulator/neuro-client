import { Component } from '@angular/core';

import {
  Settings,
  SettingsFacade,
} from '@neuro-client/stim-feature-settings/domain';
import { ParamConfigExperimentsComponent } from '@neuro-client/stim-feature-settings/feature/param-config/experiments';
import { SettingsPopupComponent } from '@neuro-client/stim-feature-settings/popup';

@Component({
  templateUrl: './experiments-page-tools.component.html',
  styleUrls: ['./experiments-page-tools.component.sass'],
})
export class ExperimentsPageToolsComponent extends SettingsPopupComponent {
  form = ParamConfigExperimentsComponent.createForm();

  constructor(facade: SettingsFacade) {
    super(facade);
  }

  getUpdatedSettingsPart() {
    return {
      experiments: this.form.value,
    };
  }

  initSettings(settings: Settings): void {
    this.form.setValue(settings.experiments);
  }
}
