import { AppState } from "@diplomka-frontend/stim-lib-store";
import { ConnectionInformation } from "../domain/connection-information";

export interface ConnectionInformationState extends AppState {
  connections: ConnectionInformation

}
