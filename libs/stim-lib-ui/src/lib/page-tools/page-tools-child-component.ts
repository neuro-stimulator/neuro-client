import { Settings } from "@diplomka-frontend/stim-lib-common";

export abstract class PageToolsChildComponent {

  public abstract initSettings(settings: Settings): void;

  public abstract getUpdatedSettingsPart();

}
