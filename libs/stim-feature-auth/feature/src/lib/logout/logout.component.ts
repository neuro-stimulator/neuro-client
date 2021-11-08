import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthFacade } from '@neuro-client/stim-feature-auth/domain';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {
  constructor(private readonly facade: AuthFacade, private readonly logger: NGXLogger) {}

  ngOnInit(): void {
    this.facade.logout();
  }
}
