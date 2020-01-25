import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  get languages(): { value: string, name: string }[] {
    return [
      { value: 'cz', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.CZ'},
      { value: 'en', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.EN'}
    ];
  }
}
