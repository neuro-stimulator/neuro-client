import { AppState } from "@diplomka-frontend/stim-lib-store";

import { FileBrowserStateType } from "../domain/file-browser-state-type";

export interface FileBrowserState extends AppState {
  fileBrowser: FileBrowserStateType
}
