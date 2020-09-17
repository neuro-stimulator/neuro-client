import { CommandClientToServer } from '@stechy1/diplomka-share';

export interface ClientCommand<T> {
  isValid: (params: string[]) => [boolean, string?];
  getName: () => string;
  getValue: (params: string[]) => T;
  description: () => string;
  getConsumer: () => 'client' | 'server';
}

class UnknownCommand implements ClientCommand<string> {
  constructor(private readonly text: string) {}

  public description() {
    return '';
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return 'unknown';
  }

  public isValid(params: string[]): [boolean, string?] {
    return [true];
  }

  public getValue(params: string[]): string {
    return this.text;
  }
}

class HelpCommand implements ClientCommand<void> {
  public description() {
    return 'Zobrazí seznam všech dostupných příkazů.';
  }

  public getConsumer(): 'client' | 'server' {
    return 'client';
  }

  public getName(): string {
    return 'help';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): void {
    return null;
  }
}

class DisplayClearCommand implements ClientCommand<void> {
  public description() {
    return 'Vymaže obsah displaye';
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_DISPLAY_CLEAR;
  }

  public isValid(params: string[]): [boolean, string?] {
    return [false];
  }

  public getValue(params: string[]): null {
    return null;
  }
}

class DisplayTextCommand
  implements ClientCommand<{ x: number; y: number; text: string }> {
  public description() {
    return `Nastaví text:  ${this.getName()} x: number, y: number, text: string`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_DISPLAY_TEXT;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 3) {
      return [
        false,
        `Nedostatečný počet parametrů: 'display show x:number y:number content:text'`,
      ];
    }

    if (typeof +params[0] !== 'number') {
      return [false, 'X-ová souřadnice musí být číslo!'];
    }
    if (typeof +params[1] !== 'number') {
      return [false, 'Y-ová souřadnice musí být číslo!'];
    }
    if (typeof params[2] !== 'string') {
      return [false, 'Obsah musí být řetězec'];
    }

    return [true];
  }

  public getValue(params: string[]): { x: number; y: number; text: string } {
    return { x: +params[0], y: +params[1], text: params[2] };
  }
}

class StimulatorStateCommand implements ClientCommand<void> {
  public description() {
    return 'Přečte ze stimulátoru aktuální stav.';
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_STIMULATOR_STATE;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): void {
    return null;
  }
}

class ExperimentUploadCommand implements ClientCommand<number> {
  public description() {
    return `Nahraje experiment do stimulátoru: ${this.getName()} id: number`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_UPLOAD;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [
        false,
        `Nedostatečný počet parametrů: 'experiment-upload id:number'`,
      ];
    }

    if (params.length > 1) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return +params[0];
  }
}

class ExperimentSetupCommand implements ClientCommand<number> {
  public description() {
    return `Inicializuje experiment ve stimulátoru: ${this.getName()} id: number`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_SETUP;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [
        false,
        `Nedostatečný počet parametrů: 'experiment-upload id:number'`,
      ];
    }

    if (params.length > 1) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return +params[0];
  }
}

class ExperimentRunCommand implements ClientCommand<void> {
  public description() {
    return `Spustí experiment: ${this.getName()}`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_RUN;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

class ExperimentPauseCommand implements ClientCommand<void> {
  public description() {
    return `Pozastaví experiment: ${this.getName()}`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_PAUSE;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

class ExperimentFinishCommand implements ClientCommand<void> {
  public description() {
    return `Ukončí experiment: ${this.getName()}`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_FINISH;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

class ExperimentClearCommand implements ClientCommand<void> {
  public description() {
    return `Vymaže experiment ze stimulátoru: ${this.getName()}`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_EXPERIMENT_CLEAR;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

class SequencePartCommand
  implements ClientCommand<{ offset: number; index: number }> {
  public description() {
    return `Nahraje vybranou část sekvence do stimulátoru: ${this.getName()} offset: number, index: number`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_SEQUENCE_PART;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [
        false,
        `Nedostatečný počet parametrů: 'sequence part offset:number index:number'`,
      ];
    }

    if (params.length > 2) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): { offset: number; index: number } {
    return { offset: +params[0], index: +params[1] };
  }
}

class MemoryCommand implements ClientCommand<number> {
  private static readonly MEMORY_TYPE: string[] = [
    'config',
    'counters',
    'accumulator',
  ];

  public description() {
    return `Vypíše zadaný kus paměti ze stimulátoru v raw podobě do konzole: ${this.getName()} memory: [${MemoryCommand.MEMORY_TYPE.toString()}]`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_MEMORY;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [
        false,
        `Nedostatečný počet parametrů: 'debug [config, counters, accumulator].'`,
      ];
    }
    if (params.length > 1) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'.`,
      ];
    }

    const memoryType = params[0];
    if (MemoryCommand.MEMORY_TYPE.indexOf(memoryType) === -1) {
      return [
        false,
        `Zadali jste nevalidní typ paměti. \nLze zadat pouze: [config, counters, accumulator].`,
      ];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return MemoryCommand.MEMORY_TYPE.indexOf(params[0]);
  }
}

// Backdoor do stimulátoru
class OutputSetCommand
  implements ClientCommand<{ index: number; brightness: number }> {
  public description() {
    return `Nastaví jeden konkrétní výstup na zadanou hodnotu: ${this.getName()} index: number, brightness: number`;
  }

  public getConsumer(): 'client' | 'server' {
    return 'server';
  }

  public getName(): string {
    return CommandClientToServer.COMMAND_OUTPUT_SET;
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length < 2) {
      return [
        false,
        `Nedostatečný počet parametrů: 'output set index:number brightness:number'`,
      ];
    }

    if (params.length > 2) {
      return [
        false,
        `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`,
      ];
    }

    if (typeof +params[0] !== 'number') {
      return [false, 'Index musí být číslo!'];
    }
    if (typeof +params[1] !== 'number') {
      return [false, 'Svítivost musí být!'];
    }

    return [true];
  }

  public getValue(params: string[]): { index: number; brightness: number } {
    return { index: +params[0], brightness: +params[1] };
  }
}

export const COMMANDS = [
  UnknownCommand,
  HelpCommand,
  DisplayClearCommand,
  DisplayTextCommand,
  StimulatorStateCommand,
  ExperimentUploadCommand,
  ExperimentSetupCommand,
  ExperimentRunCommand,
  ExperimentPauseCommand,
  ExperimentFinishCommand,
  ExperimentClearCommand,
  SequencePartCommand,
  MemoryCommand,
  OutputSetCommand,
];
