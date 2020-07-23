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
  '[Settings] Command reboot request',
  props<{}>()
);
export const actionCommandStimulatorStateRequest = createAction(
  '[Settings] Command stimulator state request',
  props<{}>()
);
export const actionCommandStimulatorStateRequestDone = createAction(
  '[Settings] Command stimulator state request done',
  props<{ state: StimulatorStateType }>()
);
export const actionCommandStimulatorStateRequestFail = createAction(
  '[Settings] Command stimulator state request fail',
  props<{}>()
);

export const actionCommandStimulatorUploadRequest = createAction(
  '[Settings] Command stimulator upload request',
  props<{}>()
);
export const actionCommandStimulatorUploadRequestDone = createAction(
  '[Settings] Command stimulator upload request done',
  props<{}>()
);
export const actionCommandStimulatorUploadRequestFail = createAction(
  '[Settings] Command stimulator upload request fail',
  props<{}>()
);

export const actionCommandStimulatorSetupRequest = createAction(
  '[Settings] Command stimulator setup request',
  props<{}>()
);
export const actionCommandStimulatorSetupRequestDone = createAction(
  '[Settings] Command stimulator setup request done',
  props<{}>()
);
export const actionCommandStimulatorSetupRequestFail = createAction(
  '[Settings] Command stimulator setup request fail',
  props<{}>()
);

export const actionCommandStimulatorRunRequest = createAction(
  '[Settings] Command stimulator run request',
  props<{}>()
);
export const actionCommandStimulatorRunRequestDone = createAction(
  '[Settings] Command stimulator run request done',
  props<{}>()
);
export const actionCommandStimulatorRunRequestFail = createAction(
  '[Settings] Command stimulator run request fail',
  props<{}>()
);

export const actionCommandStimulatorPauseRequest = createAction(
  '[Settings] Command stimulator pause request',
  props<{}>()
);
export const actionCommandStimulatorPauseRequestDone = createAction(
  '[Settings] Command stimulator pause request done',
  props<{}>()
);
export const actionCommandStimulatorPauseRequestFail = createAction(
  '[Settings] Command stimulator pause request fail',
  props<{}>()
);

export const actionCommandStimulatorFinishRequest = createAction(
  '[Settings] Command stimulator finish request',
  props<{}>()
);
export const actionCommandStimulatorFinishRequestDone = createAction(
  '[Settings] Command stimulator finish request done',
  props<{}>()
);
export const actionCommandStimulatorFinishRequestFail = createAction(
  '[Settings] Command stimulator finish request fail',
  props<{}>()
);

export const actionCommandStimulatorClearRequest = createAction(
  '[Settings] Command stimulator clear request',
  props<{}>()
);
export const actionCommandStimulatorClearRequestDone = createAction(
  '[Settings] Command stimulator clear request done',
  props<{}>()
);
export const actionCommandStimulatorClearRequestFail = createAction(
  '[Settings] Command stimulator clear request fail',
  props<{}>()
);

export const actionStimulatorNoop = createAction(
  '[Stimulator] No operation',
  props<{}>()
);
