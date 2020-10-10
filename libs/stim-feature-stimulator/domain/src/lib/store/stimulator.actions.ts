import { createAction, props } from '@ngrx/store';
import { StimulatorStateType } from '../domain/stimulator-state';

export const actionStimulatorDiscoverRequest = createAction(
  '[Stimulator] discover',
  props<{}>()
);
export const actionStimulatorDiscoverDone = createAction(
  '[Stimulator] Discovered paths',
  props<{ data: [{ path: string }] }>()
);
export const actionStimulatorDiscoverFail = createAction(
  '[Stimulator] Discovered paths',
  props<{}>()
);

export const actionStimulatorClearDiscovered = createAction(
  '[Stimulator] clear discovered',
  props<{}>()
);

export const actionStimulatorFirmwareUpdateRequest = createAction(
  '[Stimulator] firmware update request',
  props<{ path: string }>()
);
export const actionStimulatorFirmwareUpdateDone = createAction(
  '[Stimulator] firmware update request done',
  props<{}>()
);
export const actionStimulatorFirmwareUpdateFail = createAction(
  '[Stimulator] firmware update request fail',
  props<{}>()
);

export const actionCommandRebootRequest = createAction(
  '[Stimulator] Command reboot request',
  props<{}>()
);
export const actionCommandStimulatorStateRequest = createAction(
  '[Stimulator] Command stimulator state request',
  props<{}>()
);
export const actionCommandStimulatorStateRequestDone = createAction(
  '[Stimulator] Command stimulator state request done',
  props<{ state: StimulatorStateType }>()
);
export const actionCommandStimulatorStateRequestFail = createAction(
  '[Stimulator] Command stimulator state request fail',
  props<{}>()
);

export const actionCommandStimulatorUploadRequest = createAction(
  '[Stimulator] Command stimulator upload request',
  props<{}>()
);
export const actionCommandStimulatorUploadRequestDone = createAction(
  '[Stimulator] Command stimulator upload request done',
  props<{}>()
);
export const actionCommandStimulatorUploadRequestFail = createAction(
  '[Stimulator] Command stimulator upload request fail',
  props<{}>()
);

export const actionCommandStimulatorSetupRequest = createAction(
  '[Stimulator] Command stimulator setup request',
  props<{}>()
);
export const actionCommandStimulatorSetupRequestDone = createAction(
  '[Stimulator] Command stimulator setup request done',
  props<{}>()
);
export const actionCommandStimulatorSetupRequestFail = createAction(
  '[Stimulator] Command stimulator setup request fail',
  props<{}>()
);

export const actionCommandStimulatorRunRequest = createAction(
  '[Stimulator] Command stimulator run request',
  props<{}>()
);
export const actionCommandStimulatorRunRequestDone = createAction(
  '[Stimulator] Command stimulator run request done',
  props<{}>()
);
export const actionCommandStimulatorRunRequestFail = createAction(
  '[Stimulator] Command stimulator run request fail',
  props<{}>()
);

export const actionCommandStimulatorPauseRequest = createAction(
  '[Stimulator] Command stimulator pause request',
  props<{}>()
);
export const actionCommandStimulatorPauseRequestDone = createAction(
  '[Stimulator] Command stimulator pause request done',
  props<{}>()
);
export const actionCommandStimulatorPauseRequestFail = createAction(
  '[Stimulator] Command stimulator pause request fail',
  props<{}>()
);

export const actionCommandStimulatorFinishRequest = createAction(
  '[Stimulator] Command stimulator finish request',
  props<{}>()
);
export const actionCommandStimulatorFinishRequestDone = createAction(
  '[Stimulator] Command stimulator finish request done',
  props<{}>()
);
export const actionCommandStimulatorFinishRequestFail = createAction(
  '[Stimulator] Command stimulator finish request fail',
  props<{}>()
);

export const actionCommandStimulatorClearRequest = createAction(
  '[Stimulator] Command stimulator clear request',
  props<{}>()
);
export const actionCommandStimulatorClearRequestDone = createAction(
  '[Stimulator] Command stimulator clear request done',
  props<{}>()
);
export const actionCommandStimulatorClearRequestFail = createAction(
  '[Stimulator] Command stimulator clear request fail',
  props<{}>()
);

export const actionCommandStimulatorSetOutput = createAction(
  '[Stimulator] Command toggle output',
  props<{ index: number; enabled: boolean }>()
);

export const actionStimulatorNoop = createAction(
  '[Stimulator] No operation',
  props<{}>()
);
