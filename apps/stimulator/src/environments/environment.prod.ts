import { SERVER_HTTP_PORT } from '@stechy1/diplomka-share';
import { VERSION } from './version';
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
  production: true,
  testing: false,
  url: {
    server: VERSION.apiUrl,
    socket: '',
  },
  maxOutputCount: 8,
  patternSize: 32,
  // settings: DEFAULT_SETTINGS,
  disableTutorial: false,
  introDelay: 500,
  supportedLanguages: [
    { value: 'cz', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.CZ' },
    { value: 'en', name: 'SETTINGS.PARAM_CONFIG.APPLICATION.LANGUAGE.EN' },
  ],
  defaultLanguage: 'cz',
};
