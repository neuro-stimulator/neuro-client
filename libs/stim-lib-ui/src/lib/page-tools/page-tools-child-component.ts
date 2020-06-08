import { Settings } from "@diplomka-frontend/stim-feature-settings/domain";

export abstract class PageToolsChildComponent {

  public abstract initSettings(settings: Settings): void;

  public abstract getUpdatedSettingsPart();

}
