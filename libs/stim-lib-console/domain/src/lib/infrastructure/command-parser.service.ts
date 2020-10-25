import { Injectable } from "@angular/core";
import { ClientCommand, COMMANDS } from "../domain/commands";
import { ParseCommandResult } from "../domain/parse-command-result";

@Injectable({
  providedIn: "root"
})
export class CommandParserService {
  private static readonly COMMAND_REGEX = /'[^']*'|"[^"]*"|\S+/g;

  private _commandCache: ClientCommand<any>[] = [];

  constructor() {
    this._registerCommands();
  }

  /**
   * Vrátí kopii zaregistrovaných příkazů
   */
  public get commands(): ClientCommand<any>[] {
    return [...this._commandCache];
  }

  /**
   * Pokusí se naparsovat zadaný příkaz z konzole
   *
   * @param rawCommand Příkaz od klienta zadaný v konzoli
   * @return ParseCommandResult výsledek naparsovaného příkazu
   */
  public parseCommand(rawCommand: string): ParseCommandResult {
    const commands: string[] =
      rawCommand.match(CommandParserService.COMMAND_REGEX) || [];
    if (commands.length === 0) {
      throw new Error("Není co parsovat!");
    }

    let valid = false;
    let invalidReason = "Příkaz nebyl rozpoznán!";
    for (const command of this._commandCache) {
      let nameMatch = true;
      // Název příkazu se může skládat z více slov oddělených znakem '-'
      // Proto název nejdříve splitnu podle toho znaku
      const splitedName: string[] = command.getName().split("-");
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
      // return [valid, command.getName(), command.getValue(comandParams)];
      return {
        valid,
        commandName: command.getName(),
        parameters: command.getValue(comandParams),
        consumer: command.getConsumer()
      };
    }

    // return [valid, 'unknown', invalidReason];
    return {
      valid,
      commandName: "unknown",
      invalidReason,
      consumer: "client"
    };
  }

  private _registerCommands() {
    for (const command of COMMANDS) {
      this._commandCache.push(Object.create(command.prototype));
    }
  }
}
