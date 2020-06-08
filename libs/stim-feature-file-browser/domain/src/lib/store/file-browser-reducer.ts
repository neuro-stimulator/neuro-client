import { FileBrowserState } from "./file-browser-state";
import { Action, createReducer, on } from "@ngrx/store";

import * as FileBrowserActions from './file-browser-actions';

export const fileBrowserReducerKey = 'fileBrowserReducerKey';

export function fileBrowserReducer(fileBrowserState: FileBrowserState, fileBrowserAction: Action) {
  return createReducer(
    { fileBrowser: { files: [], folderPath: [] } },
    on(FileBrowserActions.actionGetContentResponse, (state: FileBrowserState, action) => ({
      ...state,
      fileBrowser: {
        folderPath: action.folders,
        files: action.files
      }
    }))
  )(fileBrowserState, fileBrowserAction);
}
