import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

import { ConfirmDialogComponent, ModalComponent } from '@diplomka-frontend/stim-lib-modal';
import { TOKEN_SUPPORTED_LANGUAGES } from '@diplomka-frontend/stim-lib-common';

@Component({
  selector: 'stim-feature-settings-param-config-application',
  templateUrl: './param-config-application.component.html',
  styleUrls: ['./param-config-application.component.sass'],
})
export class ParamConfigApplicationComponent {
  @ViewChild('modal', { static: true }) modal: ModalComponent;

  @Input() form: FormGroup;

  public static createForm(): FormGroup {
    return new FormGroup({
      language: new FormControl(null, [Validators.required]),
      disableTutorial: new FormControl(null),
    });
  }

  constructor(@Inject(TOKEN_SUPPORTED_LANGUAGES) public readonly languages: { value: string; name: string }[], private readonly logger: NGXLogger) {}

  get language() {
    return this.form.get('language');
  }

  get disableTutorial() {
    return this.form.get('disableTutorial');
  }

  handleResetTutorial() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'SETTINGS.PARAM_CONFIG.APPLICATION.TUTORIAL.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info('Budu resetovat informace o zobrazených tutoriálech.');
        // self._intro.resetTutorials();
      },
    });
  }
}
