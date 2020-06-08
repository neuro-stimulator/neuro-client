import { ConnectionStatus } from "./connection-status";

export interface ConnectionInformation {
  server: ConnectionStatus;
  serverConnectionFirstTime: boolean;
  stimulator: ConnectionStatus;
  external: ConnectionStatus;
}
