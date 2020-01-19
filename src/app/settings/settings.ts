import { DateTimeFormat } from '../share/date-time-format';

export interface Settings {
  language: string;
  experiments: {
    showDescription: boolean;
    showTags: boolean;
    showCreationDate: boolean;
    showOutputType: boolean;
    showOutputCount: boolean;
    creationDateFormat: DateTimeFormat;
  };
  player: {};
  results: {};
}

export interface ServerSettings {
  autoconnectToStimulator?: boolean;
  comPortName?: string;
}
