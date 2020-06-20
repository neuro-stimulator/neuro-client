import { createAction, props } from "@ngrx/store";
import { Experiment } from "@stechy1/diplomka-share";

// All record request
export const actionExperimentsAllWithGhostRequest = createAction('Experiments] all records request with ghosts', props<{ count?: number }>());
export const actionExperimentsAllRequest = createAction('[Experiments] all records request', props<{}>());
export const actionExperimentsAllRequestDone = createAction('[Experiments] all records request done', props<{ experiments: Experiment[] }>());
export const actionExperimentsAllRequestFail = createAction('[Experiments] all records request fail', props<{}>());

// One record request
export const actionExperimentEmpty   = createAction('[Experiments] empty record', props<{ emptyExperiment: Experiment }>());
export const actionExperimentsOneRequest = createAction('[Experiments] one record request', props<{ experimentID: number }>());
export const actionExperimentsOneRequestDone = createAction('[Experiments] one record request done', props<{ experiment: Experiment }>());
export const actionExperimentsOneRequestFail = createAction('[Experiments] one record request fail', props<{}>());

// Insert record request
export const actionExperimentsInsertRequest = createAction('[Experiments] insert record request', props<{ experiment: Experiment }>());
export const actionExperimentsInsertRequestDone = createAction('[Experiments] insert record request done', props<{ experiment: Experiment }>());
export const actionExperimentsInsertRequestFail = createAction('[Experiments] insert record request fail', props<{}>());

// Update record request
export const actionExperimentsUpdateRequest = createAction('[Experiments] update record request', props<{ experiment: Experiment }>());
export const actionExperimentsUpdateRequestDone = createAction('[Experiments] update record request done', props<{ experiment: Experiment }>());
export const actionExperimentsUpdateRequestFail = createAction('[Experiments] update record request fail', props<{}>());

// Delete record request
export const actionExperimentsDeleteRequest = createAction('[Experiments] delete record request', props<{ experimentID: number }>());
export const actionExperimentsDeleteRequestDone = createAction('[Experiments] delete record request done', props<{ experiment: Experiment }>());
export const actionExperimentsDeleteRequestFail = createAction('[Experiments] delete record request fail', props<{}>());

// Experiment name exist
export const actionExperimentsNameExistsRequest = createAction('[Experiments] name exists request', props<{ name: string, experimentID?: number }>());
export const actionExperimentsNameExistsRequestDone = createAction('[Experiments] name exists request done', props<{ exists: boolean }>());
export const actionExperimentsNameExistsRequestFail = createAction('[Experiments] name exists request fail', props<{}>());