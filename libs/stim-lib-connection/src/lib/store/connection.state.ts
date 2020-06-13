import { AppState } from "@diplomka-frontend/stim-lib-store";
import { ConnectionStatus } from "@diplomka-frontend/stim-lib-connection";

export interface ConnectionInformationState extends AppState {
  server: ConnectionStatus;
  serverConnectionFirstTime: boolean;
  stimulator: ConnectionStatus;
  external: ConnectionStatus;
  working: boolean;
}
