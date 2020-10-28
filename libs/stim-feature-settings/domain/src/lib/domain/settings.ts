import { DateTimeFormat } from '@diplomka-frontend/stim-lib-common';

export interface Settings {
  application: {
    language: string;
    disableTutorial: boolean;
  };
  experiments: {
    showDescription: boolean;
    showTags: boolean;
    showCreationDate: boolean;
    showOutputType: boolean;
    showOutputCount: boolean;
    creationDateFormat: DateTimeFormat;
  };
  player: Record<string, unknown>;
  results: Record<string, unknown>;
}

export interface ServerSettings {
  autoconnectToStimulator?: boolean;
  comPortName?: string;
  serial?: {
    baudRate?: 115200 | 57600 | 38400 | 19200 | 9600 | 4800 | 2400 | 1800 | 1200 | 600 | 300 | 200 | 150 | 134 | 110 | 75 | 50 | number;
    dataBits?: 8 | 7 | 6 | 5;
    stopBits?: 1 | 2;
    parity?: 'none' | 'even' | 'mark' | 'odd' | 'space';
  };
  stimulatorResponseTimeout?: number;
}
