import { EventEmitter } from '@angular/core';

import { Output } from '@stechy1/diplomka-share';

export interface OutputEditorArgs {
  outputs: Output[];
  actions: OutputEditorActions;
}

export interface OutputEditorActions {
  toggleSynchronize: EventEmitter<boolean>;
  synchronizeEvent: EventEmitter<SynchronizeEvent>;
}

export interface SynchronizeEvent {
  id: number;
  x: number;
  y: number;
}
