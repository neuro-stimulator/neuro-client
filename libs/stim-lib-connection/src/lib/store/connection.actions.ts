import { createAction, props } from "@ngrx/store";

export const actionServerConnectRequest = createAction('[App] Server connect request', props<{}>());
export const actionServerDisconnectRequest = createAction('[App] Server disconnect request', props<{}>());

export const actionServerConnecting = createAction('[App] Server connecting', props<{}>());
export const actionServerConnected = createAction('[App] Server connected', props<{}>());
export const actionServerDisconnected = createAction('[App] Server disconnected', props<{reason: string}>());


export const actionStimulatorConnectRequest = createAction('[Stimulator] connect request', props<{ path: string }>());
export const actionStimulatorConnected = createAction('[Stimulator] Stimulator connected', props<{}>());
export const actionStimulatorDisconnectRequest = createAction('[Stimulator] disconnect request', props<{}>());
export const actionStimulatorDisconnected = createAction('[App] Stimulator disconnected', props<{}>());
export const actionStimulatorConnectionStatusRequest = createAction('[Stimulator] connection status request', props<{}>());


export const actionExternalConnected = createAction('[App] External connected', props<{}>());
export const actionExternalDisconnected = createAction('[App] External disconnected', props<{}>());



export const actionSocketData = createAction('[App] Incomming socket data', props<{data: any}>());
