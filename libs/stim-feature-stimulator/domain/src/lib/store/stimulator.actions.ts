import { createAction, props } from '@ngrx/store';
import { StimulatorStateType } from '../domain/stimulator-state';

export const actionStimulatorDiscoverRequest = createAction('[Stimulator] discover');
export const actionStimulatorDiscoverDone = createAction('[Stimulator] Discovered paths', props<{ data: [{ path: string }] }>());
export const actionStimulatorDiscoverFail = createAction('[Stimulator] Discovered paths');

export const actionStimulatorClearDiscovered = createAction('[Stimulator] clear discovered');

export const actionStimulatorFirmwareUpdateRequest = createAction('[Stimulator] firmware update request', props<{ path: string }>());
export const actionStimulatorFirmwareUpdateDone = createAction('[Stimulator] firmware update request done');
export const actionStimulatorFirmwareUpdateFail = createAction('[Stimulator] firmware update request fail');

export const actionCommandRebootRequest = createAction('[Stimulator] Command reboot request');
export const actionCommandStimulatorStateRequest = createAction('[Stimulator] Command stimulator state request');
export const actionCommandStimulatorStateRequestDone = createAction('[Stimulator] Command stimulator state request done', props<{ state: StimulatorStateType }>());
export const actionCommandStimulatorStateRequestFail = createAction('[Stimulator] Command stimulator state request fail');

export const actionCommandStimulatorUploadRequest = createAction('[Stimulator] Command stimulator upload request');
export const actionCommandStimulatorUploadRequestDone = createAction('[Stimulator] Command stimulator upload request done');
export const actionCommandStimulatorUploadRequestFail = createAction('[Stimulator] Command stimulator upload request fail');

export const actionCommandStimulatorSetupRequest = createAction('[Stimulator] Command stimulator setup request');
export const actionCommandStimulatorSetupRequestDone = createAction('[Stimulator] Command stimulator setup request done');
export const actionCommandStimulatorSetupRequestFail = createAction('[Stimulator] Command stimulator setup request fail');

export const actionCommandStimulatorRunRequest = createAction('[Stimulator] Command stimulator run request');
export const actionCommandStimulatorRunRequestDone = createAction('[Stimulator] Command stimulator run request done');
export const actionCommandStimulatorRunRequestFail = createAction('[Stimulator] Command stimulator run request fail');

export const actionCommandStimulatorPauseRequest = createAction('[Stimulator] Command stimulator pause request');
export const actionCommandStimulatorPauseRequestDone = createAction('[Stimulator] Command stimulator pause request done');
export const actionCommandStimulatorPauseRequestFail = createAction('[Stimulator] Command stimulator pause request fail');

export const actionCommandStimulatorFinishRequest = createAction('[Stimulator] Command stimulator finish request', props<{ force: boolean }>());
export const actionCommandStimulatorFinishRequestDone = createAction('[Stimulator] Command stimulator finish request done');
export const actionCommandStimulatorFinishRequestFail = createAction('[Stimulator] Command stimulator finish request fail');

export const actionCommandStimulatorClearRequest = createAction('[Stimulator] Command stimulator clear request');
export const actionCommandStimulatorClearRequestDone = createAction('[Stimulator] Command stimulator clear request done');
export const actionCommandStimulatorClearRequestFail = createAction('[Stimulator] Command stimulator clear request fail');

export const actionCommandStimulatorSetOutput = createAction('[Stimulator] Command toggle output', props<{ index: number; enabled: boolean }>());

export const actionStimulatorNoop = createAction('[Stimulator] No operation');
