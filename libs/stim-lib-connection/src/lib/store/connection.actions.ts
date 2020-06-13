import { createAction, props } from "@ngrx/store";

export const actionServerConnectRequest = createAction('[Connection] Server connect request', props<{}>());
export const actionServerDisconnectRequest = createAction('[Connection] Server disconnect request', props<{}>());

export const actionServerConnecting = createAction('[Connection] Server connecting', props<{}>());
export const actionServerConnected = createAction('[Connection] Server connected', props<{}>());
export const actionServerDisconnected = createAction('[Connection] Server disconnected', props<{reason: string}>());


export const actionStimulatorConnectRequest = createAction('[Stimulator] connect request', props<{ path: string }>());
export const actionStimulatorConnected = createAction('[Stimulator] Stimulator connected', props<{}>());
export const actionStimulatorDisconnectRequest = createAction('[Stimulator] disconnect request', props<{}>());
export const actionStimulatorDisconnected = createAction('[Connection] Stimulator disconnected', props<{}>());
export const actionStimulatorConnectionStatusRequest = createAction('[Stimulator] connection status request', props<{}>());


export const actionExternalConnected = createAction('[Connection] External connected', props<{}>());
export const actionExternalDisconnected = createAction('[Connection] External disconnected', props<{}>());



export const actionSocketData = createAction('[Connection] Incomming socket data', props<{data: any}>());

export const actionServerStartCommunicating = createAction('[Connection] Server started communication', props<{}>());
export const actionServerEndCommunicating = createAction('[Connection] Server ended communication', props<{}>());
