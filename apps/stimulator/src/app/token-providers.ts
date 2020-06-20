import { Provider } from "@angular/core";

import {
  TOKEN_BASE_API_URL,
  TOKEN_EXPERIMENTS_API_URL, TOKEN_FILE_BROWSER_API_URL,
  TOKEN_MAX_OUTPUT_COUNT,
  TOKEN_SETTINGS_API_URL, TOKEN_STIMULATOR_API_URL,
  TOKEN_SUPPORTED_LANGUAGES
} from "@diplomka-frontend/stim-lib-common";

import { environment, makeURL } from "../environments/environment";

export const TOKEN_PROVIDERS: Provider[] = [
  {
    provide: TOKEN_MAX_OUTPUT_COUNT,
    useValue: environment.maxOutputCount
  },
  {
    provide: TOKEN_SUPPORTED_LANGUAGES,
    useValue: environment.supportedLanguages
  },
  {
    provide: TOKEN_BASE_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}`
  },
  {
    provide: TOKEN_EXPERIMENTS_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api/experiments`
  },
  {
    provide: TOKEN_SETTINGS_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api/settings`
  },
  {
    provide: TOKEN_STIMULATOR_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api`
  },
  {
    provide: TOKEN_FILE_BROWSER_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api/file-browser`
  }
];
