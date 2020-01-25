// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SERVER_HTTP_PORT, SERVER_SOCKET_PORT } from '@stechy1/diplomka-share';
import { Settings } from '../app/settings/settings';

const DEFAULT_SETTINGS: Settings = {
  application: {
    language: 'cz'
  },
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
    server: 'http://localhost',
    socket: 'http://localhost',
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
  return `${url}:${port}`;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
