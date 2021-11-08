import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthFacade } from '@neuro-client/stim-feature-auth/domain';
import { Router } from '@angular/router';

@Component({
  selector: 'stim-feature-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnDestroy {
  private _stateSubscription: Subscription;

  constructor(private readonly facade: AuthFacade, private readonly router: Router) {
    // this._stateSubscription = this.facade.state.subscribe(
    //   (state: AuthState) => {
    //     if (!state.isAuthenticated) {
    //       this.router.navigate(['auth', 'login']);
    //     } else {
    //       this.router.navigate(['profile']);
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    this._stateSubscription.unsubscribe();
  }
}
