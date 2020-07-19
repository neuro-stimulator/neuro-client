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
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private readonly facade: AuthFacade) {}

  handleLogin() {
    this.facade.login(this.form.value);
  }
}
