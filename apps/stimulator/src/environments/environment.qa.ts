import { SERVER_HTTP_PORT } from '@stechy1/diplomka-share';
// import { Settings } from '../../../../libs/stim-lib-common/src/lib/settings/settings';

// const DEFAULT_SETTINGS: Settings = {
//   application: {
//     language: 'cz',
//     disableTutorial: false
//   },
//   experiments: {
//     showDescription: true,
//     showTags: true,
//     showCreationDate: true,
//     showOutputType: true,
//     showOutputCount: true,
//     creationDateFormat: {
//       showYears: true,
//       showMonths: true,
//       showDays: true,
//       showHours: false,
//       showMinutes: false,
//       showSeconds: false,
//       showMiliseconds: false,
//     }
//   },
//   player: {},
//   results: {},
// };

export const environment = {
  production: false,
  testing: true,
  url: {
    server: '10.0.1.25',
    socket: '10.0.1.25',
  },
  port: {
    server: SERVER_HTTP_PORT,
  },
  maxOutputCount: 8,
  patternSize: 32,
  // settings: DEFAULT_SETTINGS,
  disableTutorial: true,
  introDelay: 500,
  supportedLanguages: [
    { value: 'cz', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.CZ' },
    { value: 'en', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.EN' },
  ],
  defaultLanguage: 'cz',
};

export function makeURL(url: string, port: number) {
  //return `http://${url}:${port}`;
  return '';
}
