import { Component } from '@angular/core';

import { PageToolsChildComponent } from '@diplomka-frontend/stim-lib-ui';

@Component({
  templateUrl: './player-page-tools.component.html',
  styleUrls: ['./player-page-tools.component.sass'],
})
export class PlayerPageToolsComponent extends PageToolsChildComponent {
  public readonly title = 'EXPERIMENT_PLAYER.PAGE_TOOLS.TITLE';
  public readonly confirmText = 'EXPERIMENT_PLAYER.PAGE_TOOLS.CONFIRM';
  public readonly cancelText = 'EXPERIMENT_PLAYER.PAGE_TOOLS.CANCEL';

  constructor() {
    super();
  }
}
