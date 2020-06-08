import { Component} from '@angular/core';

import { PageToolsChildComponent } from "@diplomka-frontend/stim-lib-ui";
import { Settings } from "@diplomka-frontend/stim-feature-settings/domain";

@Component({
  templateUrl: './player-page-tools.component.html',
  styleUrls: ['./player-page-tools.component.sass']
})
export class PlayerPageToolsComponent extends PageToolsChildComponent {

  constructor() {
    super();
  }

  getUpdatedSettingsPart() {}

  initSettings(settings: Settings): void {}
}
