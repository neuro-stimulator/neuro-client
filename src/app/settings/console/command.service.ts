import { Injectable } from '@angular/core';

import {
  DisplayClearCommand,
  DisplayTextCommand,
  ExperimentClearCommand,
  ExperimentUploadCommand,
  ExperimentStartCommand,
  ExperimentPauseCommand,
  ExperimentFinishCommand,
  ExperimentSetupCommand,
  OutputSetCommand, MemoryCommand, SequencePartCommand
} from './commands';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private static readonly COMMAND_REGEX = /'[^']*'|"[^"]*"|\S+/g;

  private static readonly COMMANDS = [
    new DisplayClearCommand(),
    new DisplayTextCommand(),
    new ExperimentStartCommand(),
    new ExperimentPauseCommand(),
    new ExperimentFinishCommand(),
    new ExperimentUploadCommand(),
    new ExperimentSetupCommand(),
    new ExperimentClearCommand(),
    new SequencePartCommand(),
  //  Backdoor příkazy
    new OutputSetCommand(),
    new MemoryCommand()
  ];

  public parseCommand(text: string): [boolean, string, string | any] {
    const commands: string[] = text.match(CommandService.COMMAND_REGEX) || [];
    if (commands.length === 0) {
      throw new Error('Není co parsovat!');
    }

    let valid = false;
    let invalidReason = 'Příkaz nebyl rozpoznán!';
    for (const command of CommandService.COMMANDS) {
      let nameMatch = true;
      // Název příkazu se může skládat z více slov oddělených znakem '-'
      // Proto název nejdříve splitnu podle toho znaku
      const splitedName: string[] = command.getName().split('-');
      // Proiteruji rozdělený název příkazu
      for (let i = 0; i < splitedName.length; i++) {
        // A porovnám token po tokenu
        // Pokud jeden token neodpovídá kusu z názvu příkazu
        if (splitedName[i] !== commands[i]) {
          // Nastavím příznak na 'false'
          nameMatch = false;
          // A ukončím cyklus
          break;
        }
      }
      // Pokud název příkazu nesedí
      if (!nameMatch) {
        // Budu pokračovat v hledání dalších příkazů
        continue;
      }

      // Nyní se zaměřím na parametry příkazu
      // Ty se vytvoří jako řez polem s proměnným začátkem
      // Tento začátek závisí na délce pole 'splitedName'
      const comandParams = commands.slice(splitedName.length) || [];
      // Nakonec zjistím, zda-li je příkaz validní
      [valid, invalidReason] = command.isValid(comandParams);
      // Pokud příkaz není validní, nebudu zoufat a budu pokračovat v cyklu
      if (!valid) {
        continue;
      }
      // Hurá, našel jsem validní příkaz, tak vrátím potřebné parametry
      return [valid, command.getName(), command.getValue(comandParams)];
    }

    return [valid, 'unknown', invalidReason];
  }

  public buildHelp(): string {
    const helpText = 'Nápověda: \n';
    const descriptions = CommandService.COMMANDS.map(command => `${command.getName()} - ${command.description}.`).join('\n');
    return helpText + descriptions;
  }
}
