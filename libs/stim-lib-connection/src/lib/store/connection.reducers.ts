import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { ConnectionStatus } from '@stechy1/diplomka-share';

import * as ConnectionActions from './connection.actions';
import { ConnectionInformationState } from './connection.state';

export const connectionStateKey = 'connection';

export function connectionStateReducer(connectionState: ConnectionInformationState | undefined, connectionAction: Action) {
  return createReducer(
    {
      server: ConnectionStatus.CONNECTING,
      serverConnectionFirstTime: true,
      stimulator: ConnectionStatus.CONNECTED,
      assetPlayer: ConnectionStatus.DISCONNECTED,
      working: false,
    },
    on(ConnectionActions.actionServerConnecting, (state: ConnectionInformationState) => ({
      ...state,
      server: ConnectionStatus.CONNECTING,
    })),
    on(ConnectionActions.actionServerConnected, (state: ConnectionInformationState) => ({
      ...state,
      server: ConnectionStatus.CONNECTED,
    })),
    on(ConnectionActions.actionServerDisconnected, (state: ConnectionInformationState) => ({
      ...state,
      server: ConnectionStatus.DISCONNECTED,
      serverConnectionFirstTime: false,
    })),

    on(ConnectionActions.actionStimulatorConnected, (state: ConnectionInformationState) => ({
      ...state,
      stimulator: ConnectionStatus.CONNECTED,
    })),
    on(ConnectionActions.actionStimulatorDisconnected, (state: ConnectionInformationState) => ({
      ...state,
      stimulator: ConnectionStatus.DISCONNECTED,
    })),

    on(ConnectionActions.actionIpcClosed, (state: ConnectionInformationState) => ({
      ...state,
      assetPlayer: ConnectionStatus.CLOSED,
    })),

    on(ConnectionActions.actionAssetPlayerConnected, (state: ConnectionInformationState) => ({
      ...state,
      assetPlayer: ConnectionStatus.CONNECTED,
    })),
    on(ConnectionActions.actionAssetPlayerDisconnected, ConnectionActions.actionIpcOpened, (state: ConnectionInformationState) => ({
      ...state,
      assetPlayer: ConnectionStatus.DISCONNECTED,
    })),

    on(ConnectionActions.actionServerStartCommunicating, (state: ConnectionInformationState) => ({
      ...state,
      working: true,
    })),
    on(ConnectionActions.actionServerEndCommunicating, (state: ConnectionInformationState) => ({
      ...state,
      working: false,
    }))
  )(connectionState, connectionAction);
}

export const connectionFeature = createFeatureSelector<ConnectionInformationState>(connectionStateKey);

export const serverConnectedSelector = createSelector(connectionFeature, (state: ConnectionInformationState) => state.server === ConnectionStatus.CONNECTED);

export const ipcClosedSelector = createSelector(connectionFeature, (state: ConnectionInformationState) => state.assetPlayer === ConnectionStatus.CLOSED);
export const ipcConnectedSelector = createSelector(connectionFeature, (state: ConnectionInformationState) => state.assetPlayer === ConnectionStatus.CONNECTED);
export const ipcDisconnectedSelector = createSelector(connectionFeature, (state: ConnectionInformationState) => state.assetPlayer === ConnectionStatus.DISCONNECTED);
