import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';

import { RegisterValidators } from './register.validators';

@Component({
  selector: 'stim-feature-auth',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    passwordCheck: new FormControl(null, [
      Validators.required,
      RegisterValidators.mustMatch(),
    ]),
  });

  constructor(private readonly facade: AuthFacade) {}

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordCheck(): FormControl {
    return this.form.get('passwordCheck') as FormControl;
  }

  handleRegister() {
    this.facade.register(this.form.value);
  }
}
