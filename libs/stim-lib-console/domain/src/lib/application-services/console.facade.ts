import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ConsoleActions from '../store/console.actions';
import { ConsoleState } from '../store/console.state';

@Injectable()
export class ConsoleFacade {
  constructor(private readonly store: Store<ConsoleState>) {}

  processCommand(rawCommand: string) {
    this.store.dispatch(ConsoleActions.parseCommand({ rawCommand }));
  }
}
