import { AppState } from '@neuro-client/stim-lib-store';

import { ConsoleCommand } from '../domain/console-command';

export interface ConsoleState extends AppState {
  commandHistory: ConsoleCommand[];
}
