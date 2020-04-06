import { Settings } from '../../settings/settings';

export abstract class PageToolsChildComponent {

  public abstract initSettings(settings: Settings): void;

  public abstract getUpdatedSettingsPart();

}
