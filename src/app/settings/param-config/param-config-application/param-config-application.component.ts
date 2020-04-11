import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NGXLogger } from 'ngx-logger';

import { environment } from '../../../../environments/environment';
import { ModalComponent } from '../../../share/modal/modal.component';
import { ConfirmDialogComponent } from '../../../share/modal/confirm/confirm-dialog.component';
import { IntroService } from '../../../share/intro.service';

@Component({
  selector: 'app-param-config-application',
  templateUrl: './param-config-application.component.html',
  styleUrls: ['./param-config-application.component.sass']
})
export class ParamConfigApplicationComponent implements OnInit {

  @ViewChild('modal', {static: true}) modal: ModalComponent;

  @Input() form: FormGroup;

  constructor(private readonly logger: NGXLogger,
              private readonly _intro: IntroService) { }

  ngOnInit() {
  }

  get language() {
    return this.form.get('language');
  }

  get disableTutorial() {
    return this.form.get('disableTutorial');
  }

  get languages(): Array<{ value: string, name: string }> {
    return environment.supportedLanguages;
  }

  handleResetTutorial() {
    const self = this;
    this.modal.showComponent = ConfirmDialogComponent;
    this.modal.open({
      message: 'SETTINGS.PARAM_CONFIG.APPLICATION.TUTORIAL.DIALOGS.DELETE.QUESTION',
      confirm: () => {
        self.logger.info(`Budu resetovat informace o zobrazených tutoriálech.`);
        self._intro.resetTutorials();
      }
    });
  }
}
