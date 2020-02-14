export interface ClientCommand<T> {
  isValid: (params: string[]) => [boolean, string?];
  getName: () => string;
  getValue: (params: string[]) => T;
  description: string;
}

export class UnknownCommand implements ClientCommand<string> {

  constructor(private readonly text: string) {}

  description = '';

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

export class DisplayClearCommand implements ClientCommand<void> {
  description = 'Vymaže obsah displaye';

  public getName(): string {
    return 'display-clear';
  }

  public isValid(params: string[]): [boolean, string?] {
    return [false];
  }

  public getValue(params: string[]): null {
    return null;
  }
}

export class DisplayTextCommand implements ClientCommand<{ x: number, y: number, text: string }> {
  description = `Nastaví text:  ${this.getName()} x: number, y: number, text: string`;

  public getName(): string {
    return 'display-text';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 3) {
      return [false, `Nedostatečný počet parametrů: 'display show x:number y:number content:text'`];
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

  public getValue(params: string[]): { x: number, y: number, text: string} {
    return {x: +params[0], y: +params[1], text: params[2]};
  }
}

export class ExperimentUploadCommand implements ClientCommand<number> {
  description = `Nahraje experiment do stimulátoru: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-upload';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [false, `Nedostatečný počet parametrů: 'experiment-upload id:number'`];
    }

    if (params.length > 1) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return +params[0];
  }
}

export class ExperimentSetupCommand implements ClientCommand<number> {
  description = `Inicializuje experiment ve stimulátoru: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-setup';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [false, `Nedostatečný počet parametrů: 'experiment-upload id:number'`];
    }

    if (params.length > 1) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return +params[0];
  }
}

export class ExperimentStartCommand implements ClientCommand<void> {
  description = `Spustí experiment: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-start';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

export class ExperimentStopCommand implements ClientCommand<void> {
  description = `Zastaví experiment: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-stop';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

export class ExperimentClearCommand implements ClientCommand<void> {
  description = `Vymaže experiment ze stimulátoru: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-clear';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 0) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return null;
  }
}

export class SequencePartCommand implements ClientCommand<{offset: number, index: number}> {
  description = `Nahraje vybranou část sekvence do stimulátoru.`;

  public getName(): string {
    return 'sequence-part';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [false, `Nedostatečný počet parametrů: 'sequence part offset:number index:number'`];
    }

    if (params.length > 2) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    return [true];
  }

  public getValue(params: string[]): {offset: number, index: number} {
    return {offset: +params[0], index: +params[1]};
  }
}

export class MemoryCommand implements ClientCommand<number> {

  private static readonly MEMORY_TYPE: string[] = ['config', 'counters', 'accumulator'];

  description = `Vypíše zadaný kus paměti ze stimulátoru v raw podobě do konzole.`;

  public getName(): string {
    return 'memory';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length === 0) {
      return [false, `Nedostatečný počet parametrů: 'debug [config, counters, accumulator].'`];
    }
    if (params.length > 1) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'.`];
    }

    const memoryType = params[0];
    if (MemoryCommand.MEMORY_TYPE.indexOf(memoryType) === -1) {
      return [false, `Zadali jste nevalidní typ paměti. \nLze zadat pouze: [config, counters, accumulator].`];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return MemoryCommand.MEMORY_TYPE.indexOf(params[0]);
  }

}


// Backdoor do stimulátoru
export class OutputSetCommand implements ClientCommand<{index: number, brightness: number}> {
  description = `Nastaví jeden konkrétní výstup na zadanou hodnotu: ${this.getName()} index: number, brightness: number`;

  public getName(): string {
    return 'output-set';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length < 2) {
      return [false, `Nedostatečný počet parametrů: 'output set index:number brightness:number'`];
    }

    if (params.length > 2) {
      return [false, `Byly zaznamenány neočekávané parametry: '${params.join(', ')}'`];
    }

    if (typeof +params[0] !== 'number') {
      return [false, 'Index musí být číslo!'];
    }
    if (typeof +params[1] !== 'number') {
      return [false, 'Svítivost musí být!'];
    }

    return [true];
  }

  public getValue(params: string[]): {index: number, brightness: number} {
    return {index: +params[0], brightness: +params[1]};
  }
}
