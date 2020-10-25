import { createAction, props } from '@ngrx/store';

import { SocketMessage } from '@stechy1/diplomka-share';

export const actionServerConnectRequest = createAction('[Connection] Server connect request');
export const actionServerDisconnectRequest = createAction('[Connection] Server disconnect request');

export const actionServerConnecting = createAction('[Connection] Server connecting');
export const actionServerConnected = createAction('[Connection] Server connected');
export const actionServerDisconnected = createAction('[Connection] Server disconnected', props<{ reason: string }>());

export const actionStimulatorConnectRequest = createAction('[Stimulator] connect request', props<{ path: string }>());
export const actionStimulatorConnected = createAction('[Stimulator] Stimulator connected');
export const actionStimulatorDisconnectRequest = createAction('[Stimulator] disconnect request');
export const actionStimulatorDisconnected = createAction('[Connection] Stimulator disconnected');
export const actionStimulatorConnectionStatusRequest = createAction('[Stimulator] connection status request');

export const actionExternalConnected = createAction('[Connection] External connected');
export const actionExternalDisconnected = createAction('[Connection] External disconnected');

export const actionSocketData = createAction('[Connection] Incomming socket data', props<{ data: SocketMessage }>());

export const actionServerStartCommunicating = createAction('[Connection] Server started communication');
export const actionServerEndCommunicating = createAction('[Connection] Server ended communication');
