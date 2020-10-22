// All record request
import { createAction, props } from '@ngrx/store';
import { Experiment, Output, Sequence } from '@stechy1/diplomka-share';

// All record request
export const actionSequencesAllWithGhostRequest = createAction(
  'Sequences] all records request with ghosts',
  props<{ count?: number }>()
);
export const actionSequencesAllRequest = createAction(
  '[Sequences] all records request',
  props<{}>()
);
export const actionSequencesAllRequestDone = createAction(
  '[Sequences] all records request done',
  props<{ sequences: Sequence[] }>()
);
export const actionSequencesAllRequestFail = createAction(
  '[Sequences] all records request fail',
  props<{}>()
);

// One record request
export const actionSequenceEmpty = createAction(
  '[Sequences] empty record',
  props<{ emptySequence: Sequence }>()
);
export const actionSequencesOneRequest = createAction(
  '[Sequences] one record request',
  props<{ sequenceID: number }>()
);
export const actionSequencesOneRequestDone = createAction(
  '[Sequences] one record request done',
  props<{ sequence: Sequence }>()
);
export const actionSequencesOneRequestFail = createAction(
  '[Sequences] one record request fail',
  props<{}>()
);

// Insert record request
export const actionSequencesInsertRequestFast = createAction(
  '[Sequences] insert record request fast',
  props<{ experimentID: number; name: string; size: number }>()
);
export const actionSequencesInsertRequest = createAction(
  '[Sequences] insert record request',
  props<{ sequence: Sequence }>()
);
export const actionSequencesInsertRequestDone = createAction(
  '[Sequences] insert record request done',
  props<{ sequence: Sequence }>()
);
export const actionSequencesInsertRequestFail = createAction(
  '[Sequences] insert record request fail',
  props<{}>()
);

// Update record request
export const actionSequencesUpdateRequest = createAction(
  '[Sequences] update record request',
  props<{ sequence: Sequence }>()
);
export const actionSequencesUpdateRequestDone = createAction(
  '[Sequences] update record request done',
  props<{ sequence: Sequence }>()
);
export const actionSequencesUpdateRequestFail = createAction(
  '[Sequences] update record request fail',
  props<{}>()
);

// Delete record request
export const actionSequencesDeleteRequest = createAction(
  '[Sequences] delete record request',
  props<{ sequenceID?: number }>()
);
export const actionSequencesDeleteRequestDone = createAction(
  '[Sequences] delete record request done',
  props<{ sequence: Sequence }>()
);
export const actionSequencesDeleteRequestFail = createAction(
  '[Sequences] delete record request fail',
  props<{}>()
);

// Sequence name exist
export const actionSequencesNameExistsRequest = createAction(
  '[Sequences] name exists request',
  props<{ name: string; sequenceID?: number }>()
);
export const actionSequencesNameExistsRequestDone = createAction(
  '[Sequences] name exists request done',
  props<{ exists: boolean }>()
);
export const actionSequencesNameExistsRequestFail = createAction(
  '[Sequences] name exists request fail',
  props<{}>()
);

// Sequence specific actions

// Generate new sequence for selected experiment
export const actionSequencesGenerateRequest = createAction(
  '[Sequences] generate new sequence request',
  props<{ sequence: Sequence }>()
);
export const actionSequencesGenerateDone = createAction(
  '[Sequences] generate new sequence request done',
  props<{ sequenceData: number[] }>()
);
export const actionSequencesGenerateFail = createAction(
  '[Sequences] generate new sequence request fail',
  props<{}>()
);

// Get all experiments as sequence providers
export const actionSequencesExperimentsAsSequenceSourceRequest = createAction(
  '[Sequences] find sequences for experiments as sequence source',
  props<{}>()
);
export const actionSequencesExperimentsAsSequenceSourceRequestDone = createAction(
  '[Sequences] find sequences for experiments as sequence source done',
  props<{ experiments: Experiment<Output>[] }>()
);
export const actionSequencesExperimentsAsSequenceSourceRequestFail = createAction(
  '[Sequences] find sequences for experiments as sequence source fail',
  props<{}>()
);

export const actionSequencesOriginalAsActual = createAction(
  '[Sequences] replace original sequence as actual',
  props<{}>()
);

export const actionSequencesUpdateSelectedExperiment = createAction(
  '[Sequences] update selected experiment',
  props<{}>()
);

export const actionSequencesToggleSelected = createAction(
  '[Sequences] toggle sequence entry selected',
  props<{ sequence: Sequence }>()
);

export const actionSequencesSelectAll = createAction(
  '[Sequences] select all sequences',
  props<{}>()
);
export const actionSequencesSelectNone = createAction(
  '[Sequences] deselect all sequences',
  props<{}>()
);

export const actionSequencesNoAction = createAction(
  '[Sequences] no action',
  props<{}>()
);
