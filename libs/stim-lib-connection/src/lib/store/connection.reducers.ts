import { Action, createReducer, on } from '@ngrx/store';

import { ConnectionStatus } from '../domain/connection-status';
import * as ConnectionActions from './connection.actions';
import { ConnectionInformationState } from './connection.state';

export const connectionStateKey = 'connection';

export function connectionStateReducer(
  connectionState: ConnectionInformationState | undefined,
  connectionAction: Action
) {
  return createReducer(
    {
      server: ConnectionStatus.CONNECTING,
      serverConnectionFirstTime: true,
      stimulator: ConnectionStatus.CONNECTED,
      external: ConnectionStatus.DISCONNECTED,
      working: false,
    },
    on(
      ConnectionActions.actionServerConnecting,
      (state: ConnectionInformationState, action) => ({
        ...state,
        server: ConnectionStatus.CONNECTING,
      })
    ),
    on(
      ConnectionActions.actionServerConnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        server: ConnectionStatus.CONNECTED,
      })
    ),
    on(
      ConnectionActions.actionServerDisconnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        server: ConnectionStatus.DISCONNECTED,
        serverConnectionFirstTime: false,
      })
    ),

    on(
      ConnectionActions.actionStimulatorConnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        stimulator: ConnectionStatus.CONNECTED,
      })
    ),
    on(
      ConnectionActions.actionStimulatorDisconnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        stimulator: ConnectionStatus.DISCONNECTED,
      })
    ),

    on(
      ConnectionActions.actionExternalConnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        external: ConnectionStatus.CONNECTED,
      })
    ),
    on(
      ConnectionActions.actionExternalDisconnected,
      (state: ConnectionInformationState, action) => ({
        ...state,
        external: ConnectionStatus.DISCONNECTED,
      })
    ),

    on(
      ConnectionActions.actionServerStartCommunicating,
      (state: ConnectionInformationState, action) => ({
        ...state,
        working: true,
      })
    ),
    on(
      ConnectionActions.actionServerEndCommunicating,
      (state: ConnectionInformationState, action) => ({
        ...state,
        working: false,
      })
    )
  )(connectionState, connectionAction);
}
