import { Injectable, Injector } from "@angular/core";
import { LocalCommandHandler } from "./local-command.handler";
import { TRANSLATE_COMMAND_TOKENS } from "./command-tokens";
import { ParseCommandResult } from "../domain/parse-command-result";

@Injectable({ providedIn: "root" })
export class LocalCommandFactory {
  constructor(private readonly injector: Injector) {
  }

  public getCommandHandler(
    localCommand: ParseCommandResult
  ): LocalCommandHandler {
    const name = localCommand.commandName;
    const token = TRANSLATE_COMMAND_TOKENS[name];
    return this.injector.get<LocalCommandHandler>(token);
  }
}
