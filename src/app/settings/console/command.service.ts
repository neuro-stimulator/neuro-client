import { Injectable } from '@angular/core';
import { CommandsService } from '../../share/commands.service';
import { ConsoleCommand } from './console-command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private static readonly COMMAND_REGEX = new RegExp(`'[^']*'|"[^"]*"|\\S+`);

  constructor(private readonly _commands: CommandsService) {
    CommandService.COMMAND_REGEX.compile();
  }

  public parseCommand(text: string): ConsoleCommand {
    const commands = text.match(`'[^']*'|"[^"]*"|\\S+`);
    // const commands: RegExpExecArray = CommandService.COMMAND_REGEX.exec(text);
    // const commands = text.split(CommandService.COMMAND_REGEX);
    console.log(commands);


    return {
      date: new Date(),
      text
    };
  }
}
