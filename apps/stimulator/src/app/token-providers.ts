import { Provider } from '@angular/core';

import {
  TOKEN_ASSET_PLAYER_API_URL,
  TOKEN_AUTH_API_URL,
  TOKEN_BASE_API_URL,
  TOKEN_CONSOLE_API_URL,
  TOKEN_EXPERIMENT_RESULTS_API_URL,
  TOKEN_EXPERIMENTS_API_URL,
  TOKEN_FILE_BROWSER_API_URL,
  TOKEN_MAX_OUTPUT_COUNT,
  TOKEN_PATTERN_SIZE,
  TOKEN_PLAYER_API_URL,
  TOKEN_SEED_API_URL,
  TOKEN_SEQUENCES_API_URL,
  TOKEN_SETTINGS_API_URL,
  TOKEN_STIMULATOR_API_URL,
  TOKEN_SUPPORTED_LANGUAGES,
  TOKEN_USERS_API_URL,
} from '@neuro-client/stim-lib-common';

import { environment } from '../environments/environment';

export const TOKEN_PROVIDERS: Provider[] = [
  {
    provide: TOKEN_MAX_OUTPUT_COUNT,
    useValue: environment.maxOutputCount,
  },
  {
    provide: TOKEN_PATTERN_SIZE,
    useValue: environment.patternSize,
  },
  {
    provide: TOKEN_SUPPORTED_LANGUAGES,
    useValue: environment.supportedLanguages,
  },
  {
    provide: TOKEN_BASE_API_URL,
    useValue: environment.url.server + '/',
  },
  {
    provide: TOKEN_EXPERIMENTS_API_URL,
    useValue: environment.url.server + '/api/experiments',
  },
  {
    provide: TOKEN_EXPERIMENT_RESULTS_API_URL,
    useValue: environment.url.server + '/api/experiment-results',
  },
  {
    provide: TOKEN_SEQUENCES_API_URL,
    useValue: environment.url.server + '/api/sequences',
  },
  {
    provide: TOKEN_SETTINGS_API_URL,
    useValue: environment.url.server + '/api/settings',
  },
  {
    provide: TOKEN_SEED_API_URL,
    useValue: environment.url.server + '/api/seed',
  },
  {
    provide: TOKEN_STIMULATOR_API_URL,
    useValue: environment.url.server + '/api',
  },
  {
    provide: TOKEN_FILE_BROWSER_API_URL,
    useValue: environment.url.server + '/api/file-browser',
  },
  {
    provide: TOKEN_CONSOLE_API_URL,
    useValue: environment.url.server + '/api/console',
  },

  {
    provide: TOKEN_AUTH_API_URL,
    useValue: environment.url.server + '/api/auth',
  },
  {
    provide: TOKEN_USERS_API_URL,
    useValue: environment.url.server + '/api/users',
  },
  {
    provide: TOKEN_PLAYER_API_URL,
    useValue: environment.url.server + '/api/player',
  },
  {
    provide: TOKEN_ASSET_PLAYER_API_URL,
    useValue: environment.url.server + '/api/ipc',
  },
];
