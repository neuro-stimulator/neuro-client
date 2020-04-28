import { Component } from '@angular/core';

import { ParamConfigExperimentsComponent } from '../../settings/param-config/param-config-experiments/param-config-experiments.component';
import { PageToolsChildComponent } from '../../share/page-tools/page-tools-child-component';
import { Settings } from '../../settings/settings';

@Component({
  selector: 'app-experiments-page-tools',
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
