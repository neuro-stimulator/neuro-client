import { createAction, props } from '@ngrx/store';

import { ExperimentStopConditionType, PlayerConfiguration } from '@stechy1/diplomka-share';

import { IOEvent } from '@stechy1/diplomka-share/lib/serial-data-events';

export const actionPlayerStateRequest = createAction('[Player] state request');

export const actionPlayerIOEvent = createAction('[Player] io event', props<{ ioEvent: IOEvent }>());

export const actionPrepareExperimentPlayerRequest = createAction('[Player] prepare experiment player', props<{ options: PlayerConfiguration }>());
export const actionPrepareExperimentPlayerRequestDone = createAction(
  '[Player] prepare experiment player done',
  props<{
    autoplay: boolean;
    betweenExperimentInterval: number;
    repeat: number;
  }>()
);
export const actionPrepareExperimentPlayerRequestFail = createAction('[Player] prepare experiment player fail');

export const actionPlayerUpdateState = createAction('[Player] update player state from server', props<PlayerConfiguration>());

export const actionPlayerCreateNewExperimentRound = createAction('[Player] create new experiment round');

export const actionPlayerClearExperiment = createAction('[Player] clear experiment');

export const actionPlayerNoAction = createAction('[Player] no action');

export const actionPlayerAvailableStopConditionsRequest = createAction('[Player] available stop conditions request');
export const actionPlayerAvailableStopConditionsDone = createAction('[Player] available stop conditions done', props<{ stopConditions: ExperimentStopConditionType[] }>());
export const actionPlayerAvailableStopConditionsFail = createAction('[Player] available stop conditions fail');
