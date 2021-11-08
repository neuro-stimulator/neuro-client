import { ConnectionStatus } from '@stechy1/diplomka-share';

import { AppState } from '@neuro-client/stim-lib-store';

export interface ConnectionInformationState extends AppState {
  server: ConnectionStatus;
  serverConnectionFirstTime: boolean;
  stimulator: ConnectionStatus;
  assetPlayer: ConnectionStatus;
  working: boolean;
}
