import { Provider } from '@angular/core';

import {
  TOKEN_BASE_API_URL,
  TOKEN_EXPERIMENT_RESULTS_API_URL,
  TOKEN_EXPERIMENTS_API_URL,
  TOKEN_SEQUENCES_API_URL,
  TOKEN_FILE_BROWSER_API_URL,
  TOKEN_MAX_OUTPUT_COUNT,
  TOKEN_SETTINGS_API_URL,
  TOKEN_STIMULATOR_API_URL,
  TOKEN_SUPPORTED_LANGUAGES,
  TOKEN_AUTH_API_URL,
  TOKEN_USERS_API_URL,
  TOKEN_PLAYER_API_URL,
  TOKEN_PATTERN_SIZE,
} from '@diplomka-frontend/stim-lib-common';

import { environment, makeURL } from '../environments/environment';

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
    useValue: `/`,
  },
  {
    provide: TOKEN_EXPERIMENTS_API_URL,
    useValue: `/api/experiments`,
  },
  {
    provide: TOKEN_EXPERIMENT_RESULTS_API_URL,
    useValue: `/api/experiment-results`,
  },
  {
    provide: TOKEN_SEQUENCES_API_URL,
    useValue: `/api/sequences`,
  },
  {
    provide: TOKEN_SETTINGS_API_URL,
    useValue: `/api/settings`,
  },
  {
    provide: TOKEN_STIMULATOR_API_URL,
    useValue: `/api`,
  },
  {
    provide: TOKEN_FILE_BROWSER_API_URL,
    useValue: `/api/file-browser`,
  },

  {
    provide: TOKEN_AUTH_API_URL,
    useValue: '/api/auth',
  },
  {
    provide: TOKEN_USERS_API_URL,
    useValue: `/api/users`,
  },
  {
    provide: TOKEN_PLAYER_API_URL,
    useValue: '/api/player',
  },
];
