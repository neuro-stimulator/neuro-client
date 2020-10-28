import { Observable } from 'rxjs';

import { ParseCommandResult } from '../domain/parse-command-result';

export interface LocalCommandHandler {
  handle(command: ParseCommandResult): Observable<string | undefined>;
}
