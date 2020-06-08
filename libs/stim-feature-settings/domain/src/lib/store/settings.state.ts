import { ServerSettings, Settings } from "../..";

export interface SettingsState {
  settings: Settings;
  serverSettings: ServerSettings;
  working: boolean;
}
