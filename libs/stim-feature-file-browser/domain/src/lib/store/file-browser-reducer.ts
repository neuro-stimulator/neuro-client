import { FileBrowserState } from './file-browser-state';
import { Action, createReducer, on } from '@ngrx/store';

import * as FileBrowserActions from './file-browser-actions';

export const fileBrowserReducerKey = 'fileBrowser';

export function fileBrowserReducer(
  fileBrowserState: FileBrowserState,
  fileBrowserAction: Action
) {
  return createReducer(
    { files: [], folderPath: [], selectedFile: null },
    on(
      FileBrowserActions.actionGetContentResponse,
      (state: FileBrowserState, action) => ({
        ...state,
        folderPath: [...action.folders],
        files: [...action.files],
      })
    ),
    on(
      FileBrowserActions.actionSelectFile,
      (state: FileBrowserState, action) => ({
        ...state,
        selectedFile: action.file,
      })
    ),
    on(
      FileBrowserActions.actionToggleFile,
      (state: FileBrowserState, action) => {
        const oldFile = { ...state.selectedFile };
        let folderContentCopy = [...state.files];
        let newFile = null;

        if (state.selectedFile) {
          const oldSelectedFile = { ...state.selectedFile };
          oldSelectedFile.selected = false;
          const oldSelectedFileIndex = folderContentCopy.findIndex(
            (value) => value.name === state.selectedFile.name
          );
          folderContentCopy = [
            ...folderContentCopy.slice(0, oldSelectedFileIndex),
            oldSelectedFile,
            ...folderContentCopy.slice(oldSelectedFileIndex + 1),
          ];
        }

        if (
          (!state.selectedFile || oldFile.name !== action.file.name) &&
          !action.file.isDirectory
        ) {
          newFile = { ...action.file };
          newFile.selected = true;
          const newSelectedFileIndex = folderContentCopy.findIndex(
            (value) => value.name === action.file.name
          );
          folderContentCopy = [
            ...folderContentCopy.slice(0, newSelectedFileIndex),
            newFile,
            ...folderContentCopy.slice(newSelectedFileIndex + 1),
          ];
        }
        return {
          ...state,
          selectedFile: newFile,
          files: folderContentCopy,
        };
      }
    )
  )(fileBrowserState, fileBrowserAction);
}
