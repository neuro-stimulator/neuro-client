import { ServerSettings, Settings } from "../domain/settings";

export interface SettingsState {
  localSettings: Settings;
  localSettingsLoaded: boolean;
  serverSettings: ServerSettings;
  viewFragment: string;
}
