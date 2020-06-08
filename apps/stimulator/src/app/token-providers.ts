import { Provider } from "@angular/core";
import { TOKEN_EXPERIMENTS_API_URL, TOKEN_SETTINGS_API_URL } from "@diplomka-frontend/stim-lib-common";
import { environment, makeURL } from "../environments/environment";

export const TOKEN_PROVIDERS: Provider[] = [
  {
    provide: TOKEN_EXPERIMENTS_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api/experiments`
  },
  {
    provide: TOKEN_SETTINGS_API_URL,
    useValue: `${makeURL(environment.url.server, environment.port.server)}/api/settings`
  }
];
