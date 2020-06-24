import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PlayerActions from './player.actions';
import { switchMap } from 'rxjs/operators';
import { ExperimentsFacade } from '@diplomka-frontend/stim-feature-experiments/domain';

@Injectable()
export class PlayerEffects {
  constructor(private readonly actions$: Actions) {}
}
