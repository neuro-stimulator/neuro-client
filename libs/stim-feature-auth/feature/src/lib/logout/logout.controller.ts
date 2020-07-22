import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthFacade } from '@diplomka-frontend/stim-feature-auth/domain';

@Component({
  template: '',
})
export class LogoutController implements OnInit {
  constructor(
    private readonly facade: AuthFacade,
    private readonly logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.facade.logout();
  }
}
