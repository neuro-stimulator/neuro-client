import { Component } from '@angular/core';

import { PageToolsChildComponent } from "@diplomka-frontend/stim-lib-ui";
import { Settings } from "@diplomka-frontend/stim-feature-settings/domain";
import { ParamConfigExperimentsComponent } from "@diplomka-frontend/stim-feature-settings/feature";

@Component({
  templateUrl: './experiments-page-tools.component.html',
  styleUrls: ['./experiments-page-tools.component.sass']
})
export class ExperimentsPageToolsComponent extends PageToolsChildComponent {

  form = ParamConfigExperimentsComponent.createForm();

  constructor() {
    super();
  }

  getUpdatedSettingsPart() {
    return {
      experiments: this.form.value
    };
  }

  initSettings(settings: Settings): void {
    this.form.setValue(settings.experiments);
  }

}
