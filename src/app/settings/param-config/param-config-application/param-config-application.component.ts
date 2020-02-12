import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-param-config-application',
  templateUrl: './param-config-application.component.html',
  styleUrls: ['./param-config-application.component.sass']
})
export class ParamConfigApplicationComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get language() {
    return this.form.get('language');
  }

  get disableTutorial() {
    return this.form.get('disableTutorial');
  }

  get languages(): { value: string, name: string }[] {
    return environment.supportedLanguages;
  }
}
