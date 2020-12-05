import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Output } from '@stechy1/diplomka-share';

export interface OutputEditorArgs {
  outputs: Output[];
  actions: OutputEditorActions;
  connected: Observable<boolean>;
  synchronizeOutputs: Observable<boolean>;
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
