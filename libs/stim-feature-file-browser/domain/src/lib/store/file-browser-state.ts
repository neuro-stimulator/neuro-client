import { AppState } from '@neuro-client/stim-lib-store';

import { FileRecord } from '@stechy1/diplomka-share';

export interface FileBrowserState extends AppState {
  folderPath: FileRecord[];
  files: FileRecord[];
  selectedFile: FileRecord;
}
