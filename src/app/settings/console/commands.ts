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

export class RebootCommand implements ClientCommand<void> {
  description = 'Restartuje server';

  public getName(): string {
    return 'reboot';
  }

  public isValid(params: string[]): [boolean, string?] {
    return [true];
  }

  public getValue(params: string[]): void {
    return null;
  }
}

export class SetTimeCommand implements ClientCommand<number> {
  description = 'Nastaví čas stimulátoru - deprecated';

  public getName(): string {
    return 'set-time';
  }

  public isValid(params: string[]): [boolean, string?] {
    if (params.length !== 1) {
      return [false, 'Nedostatečný počet parametrů'];
    }

    return [true];
  }

  public getValue(params: string[]): number {
    return Date.parse(params[0]);
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

export class ExperimentSetupCommand implements ClientCommand<number> {
  description = `Nahraje experiment do stimulátoru: ${this.getName()} id: number`;

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
    return null;
  }
}

export class ExperimentInitCommand implements ClientCommand<void> {
  description = `Inicializuje experiment: ${this.getName()} id: number`;

  public getName(): string {
    return 'experiment-init';
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
