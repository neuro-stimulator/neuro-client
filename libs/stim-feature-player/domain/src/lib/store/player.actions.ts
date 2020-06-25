import { createAction, props } from '@ngrx/store';
import { IOEvent } from '@stechy1/diplomka-share/lib/serial-data-events';

export const actionPlayerGetExperimentRequest = createAction(
  '[Player] get experiment',
  props<{ experimentID: number }>()
);

export const actionPlayerIOEvent = createAction(
  '[Player] io event',
  props<{ ioEvent: IOEvent }>()
);
