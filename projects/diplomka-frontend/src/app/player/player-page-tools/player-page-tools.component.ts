import { Component} from '@angular/core';

import { PageToolsChildComponent } from '../../share/page-tools/page-tools-child-component';
import { Settings } from '../../settings/settings';

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
