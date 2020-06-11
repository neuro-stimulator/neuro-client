import { ServerSettings, Settings } from "../..";

export interface SettingsState {
  localSettings: Settings;
  localSettingsLoaded: boolean;
  serverSettings: ServerSettings;
  working: boolean;
}
