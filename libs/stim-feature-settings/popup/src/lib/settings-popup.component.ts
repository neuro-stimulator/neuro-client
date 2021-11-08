import { map, take, tap } from 'rxjs/operators';

import { PageToolsChildComponent } from '@neuro-client/stim-lib-ui';
import {
  Settings,
  SettingsFacade,
  SettingsState,
} from '@neuro-client/stim-feature-settings/domain';

export abstract class SettingsPopupComponent extends PageToolsChildComponent {
  private _settingsCopy: Settings;

  public readonly title = 'SETTINGS.PAGE_TOOLS.TITLE';
  public readonly confirmText = 'SETTINGS.PAGE_TOOLS.CONFIRM';
  public readonly cancelText = 'SETTINGS.PAGE_TOOLS.CANCEL';

  protected constructor(private readonly facade: SettingsFacade) {
    super();
  }

  init() {
    this.facade.state
      .pipe(
        take(1),
        map((state: SettingsState) => ({
          ...state.localSettings,
        })),
        tap((settings: Settings) => {
          this._settingsCopy = settings;
          this.initSettings(settings);
        })
      )
      .subscribe();
  }

  confirm() {
    // Získám aktualizovanou část nastavení
    const settingsPart = this.getUpdatedSettingsPart();
    // Zmerguju novou část s originálním nastavením
    this.facade.localSettings = Object.assign(this._settingsCopy, settingsPart);
  }

  protected abstract initSettings(settings: Settings): void;

  protected abstract getUpdatedSettingsPart(): Partial<Settings>;
}
