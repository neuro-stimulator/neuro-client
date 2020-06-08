import { Action, createReducer, on } from "@ngrx/store";

import * as ConnectionActions from './connection.actions';
import { ConnectionInformationState } from "./connection.state";
import { ConnectionStatus } from "../domain/connection-status";

export const connectionStateKey = 'connectionStateKey';

export function connectionStateReducer(connectionState: ConnectionInformationState | undefined, connectionAction: Action) {
  return createReducer(
    {
      connections: {
        server: ConnectionStatus.DISCONNECTED,
        serverConnectionFirstTime: true,
        stimulator: ConnectionStatus.DISCONNECTED,
        external: ConnectionStatus.DISCONNECTED
      }
    },
    on(ConnectionActions.actionServerConnecting, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        server: ConnectionStatus.CONNECTING
      }
    })),
    on(ConnectionActions.actionServerConnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        server: ConnectionStatus.CONNECTED
      }
    })),
    on(ConnectionActions.actionServerDisconnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        server: ConnectionStatus.DISCONNECTED,
        serverConnectionFirstTime: false
      }
    })),


    on(ConnectionActions.actionStimulatorConnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        stimulator: ConnectionStatus.CONNECTED
      }
    })),
    on(ConnectionActions.actionStimulatorDisconnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        stimulator: ConnectionStatus.DISCONNECTED
      }
    })),


    on(ConnectionActions.actionExternalConnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        external: ConnectionStatus.CONNECTED
      }
    })),
    on(ConnectionActions.actionExternalDisconnected, (state, action) => ({
      ...state,
      connections: {
        ...state.connections,
        external: ConnectionStatus.DISCONNECTED
      }
    })),
  )(connectionState, connectionAction);
}
