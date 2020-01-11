import { SERVER_HTTP_PORT, SERVER_SOCKET_PORT } from '@stechy1/diplomka-share';
import { Settings } from '../app/settings/settings';

const DEFAULT_SETTINGS: Settings = {
  experiments: {
    showDescription: true,
    showTags: true,
    showCreationDate: true,
    showOutputType: true,
    showOutputCount: true,
    creationDateFormat: {
      showYears: true,
      showMonths: true,
      showDays: true,
      showHours: false,
      showMinutes: false,
      showSeconds: false,
      showMiliseconds: false,
    }
  },
  player: {},
  results: {},
};

export const environment = {
  production: false,
  url: {
    server: '',
    socket: '',
  },
  port: {
    server: SERVER_HTTP_PORT,
    socket: SERVER_SOCKET_PORT
  },
  maxOutputCount: 8,
  patternSize: 32,
  settings: DEFAULT_SETTINGS
};

export function makeURL(url: string, port: number) {
  return '';
}
