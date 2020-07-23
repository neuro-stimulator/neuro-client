import { PageToolsChildComponent } from "@diplomka-frontend/stim-lib-ui";
import { Settings } from "@diplomka-frontend/stim-feature-settings/domain";

export abstract class SettingsPopupComponent extends PageToolsChildComponent {

  init() {
    // const settings: Settings = this._settings.settings;
    // this.initSettings(settings);
  }

  confirm() {
    // Získám aktualizovanou část nastavení
    // const settingsPart = this.getUpdatedSettingsPart();
    // Zmerguju novou část s originálním nastavením
    // this._settings.settings = Object.assign(this._settings.settings, settingsPart);
  }

  protected abstract initSettings(settings: Settings): void;

  protected abstract getUpdatedSettingsPart(): Partial<Settings>

}
