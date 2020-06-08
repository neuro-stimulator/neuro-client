import { createAction, props } from "@ngrx/store";
import { FileRecord } from "@stechy1/diplomka-share";

export const actionGetContentRequest = createAction('[FileBrowser] getContent request', props<{ folders: FileRecord[] }>());
export const actionGetContentResponse = createAction('[FileBrowser] getContent response', props<{ folders: FileRecord[], files: FileRecord[] }>());
export const actionCreateFolderRequest = createAction('[FileBrowser] createFolder request', props<{folders: FileRecord[], folderName: string }>());
export const actionUploadRequest = createAction('[FileBrowser] upload request', props<{ folders: FileRecord[], files: FileList }>());
export const actionDeleteRequest = createAction('[FileBrowser] delete request', props<{ folders: FileRecord[], file: FileRecord }>());
