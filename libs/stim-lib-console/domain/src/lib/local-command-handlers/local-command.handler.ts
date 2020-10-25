import { ParseCommandResult } from "../domain/parse-command-result";
import { Observable } from "rxjs";

export interface LocalCommandHandler {
  handle(command: ParseCommandResult): Observable<string | undefined>;
}
