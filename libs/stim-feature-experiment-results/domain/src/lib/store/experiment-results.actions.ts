// All record request
import { createAction, props } from '@ngrx/store';
import { ExperimentResult, IOEvent } from '@stechy1/diplomka-share';

export const actionExperimentResultsAllWithGhostRequest = createAction(
  '[ExperimentResults] all records request with ghosts',
  props<{ count?: number }>()
);
export const actionExperimentResultsAllRequest = createAction(
  '[ExperimentResults] all records request',
  props<{}>()
);
export const actionExperimentResultsAllRequestDone = createAction(
  '[ExperimentResults] all records request done',
  props<{ experimentResults: ExperimentResult[] }>()
);
export const actionExperimentResultsAllRequestFail = createAction(
  '[ExperimentResults] all records request fail',
  props<{}>()
);

// One record request
export const actionExperimentResultsEmpty = createAction(
  '[ExperimentResults] empty record',
  props<{ emptyExperimentResult: ExperimentResult }>()
);
export const actionExperimentResultsOneRequest = createAction(
  '[ExperimentResults] one record request',
  props<{ experimentResultID: number }>()
);
export const actionExperimentResultsOneRequestDone = createAction(
  '[ExperimentResults] one record request done',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsOneRequestFail = createAction(
  '[ExperimentResults] one record request fail',
  props<{}>()
);

export const actionExperimentResultsDataDone = createAction(
  '[ExperimentResults] result data done',
  props<{ data: IOEvent[] }>()
);
export const actionExperimentResultsDataFail = createAction(
  '[ExperimentResults] result data fail',
  props<{}>()
);

// Insert record request
export const actionExperimentResultsInsertRequest = createAction(
  '[ExperimentResults] insert record request',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsInsertRequestDone = createAction(
  '[ExperimentResults] insert record request done',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsInsertRequestFail = createAction(
  '[ExperimentResults] insert record request fail',
  props<{}>()
);

// Update record request
export const actionExperimentResultsUpdateRequest = createAction(
  '[ExperimentResults] update record request',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsUpdateRequestDone = createAction(
  '[ExperimentResults] update record request done',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsUpdateRequestFail = createAction(
  '[ExperimentResults] update record request fail',
  props<{}>()
);

// Delete record request
export const actionExperimentResultsDeleteRequest = createAction(
  '[ExperimentResults] delete record request',
  props<{ experimentResultID: number }>()
);
export const actionExperimentResultsDeleteRequestDone = createAction(
  '[ExperimentResults] delete record request done',
  props<{ experimentResult: ExperimentResult }>()
);
export const actionExperimentResultsDeleteRequestFail = createAction(
  '[ExperimentResults] delete record request fail',
  props<{}>()
);

// ExperimentResult name exist
export const actionExperimentResultsNameExistsRequest = createAction(
  '[ExperimentResults] name exists request',
  props<{ name: string; experimentResultID?: number }>()
);
export const actionExperimentResultsNameExistsRequestDone = createAction(
  '[ExperimentResults] name exists request done',
  props<{ exists: boolean }>()
);
export const actionExperimentResultsNameExistsRequestFail = createAction(
  '[ExperimentResults] name exists request fail',
  props<{}>()
);
