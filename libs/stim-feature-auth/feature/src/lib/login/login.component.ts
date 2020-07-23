import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  AuthFacade,
  AuthState,
} from '@diplomka-frontend/stim-feature-auth/domain';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'stim-feature-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('aaa@bbb.cz'),
    password: new FormControl('1234567890'),
  });

  constructor(
    private readonly facade: AuthFacade,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // this.facade.state
    //   .pipe(
    //     map((state: AuthState) => state.isAuthenticated),
    //     take(2)
    //   )
    //   .subscribe((authenticated) => {
    //     if (authenticated) {
    //       this.router.navigate(['experiments']);
    //     }
    //   });
  }

  handleLogin() {
    this.facade.login(this.form.value);
  }
}
