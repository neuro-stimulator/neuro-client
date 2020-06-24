import { createAction, props } from '@ngrx/store';

export const actionPlayerGetExperimentRequest = createAction(
  '[Player] get experiment',
  props<{ experimentID: number }>()
);
