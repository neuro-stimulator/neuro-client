import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'stim-feature-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('aaa@bbb.cz'),
    password: new FormControl('1234567890'),
  });

  constructor(private readonly facade: AuthFacade) {}

  handleLogin() {
    this.facade.login(this.form.value);
  }
}
