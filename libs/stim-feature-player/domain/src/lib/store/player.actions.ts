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

export const actionPrepareExperimentPlayerRequest = createAction(
  '[Player] prepare experiment player',
  props<{ options: {} }>()
);
export const actionPrepareExperimentPlayerRequestDone = createAction(
  '[Player] prepare experiment player done',
  props<{}>()
);
export const actionPrepareExperimentPlayerRequestFail = createAction(
  '[Player] prepare experiment player fail',
  props<{}>()
);

export const actionPlayerUpdateState = createAction(
  '[Player] update player state from server',
  props<{
    initialized: boolean;
    experimentRound: number;
    ioData: IOEvent[][];
  }>()
);
