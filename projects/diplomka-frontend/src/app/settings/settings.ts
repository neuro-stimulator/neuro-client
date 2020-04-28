import { DateTimeFormat } from '../share/date-time-format';

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
  player: {};
  results: {};
}

export interface ServerSettings {
  autoconnectToStimulator?: boolean;
  comPortName?: string;
}
