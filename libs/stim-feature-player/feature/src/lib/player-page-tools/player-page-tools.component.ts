import { Component} from '@angular/core';

import { PageToolsChildComponent } from "@diplomka-frontend/stim-lib-ui";

@Component({
  templateUrl: './player-page-tools.component.html',
  styleUrls: ['./player-page-tools.component.sass']
})
export class PlayerPageToolsComponent extends PageToolsChildComponent {

  constructor() {
    super();
  }
}
