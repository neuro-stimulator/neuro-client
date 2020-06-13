import { AppState } from "@diplomka-frontend/stim-lib-store";

import { Type } from "@angular/core";

export interface NavigationState extends AppState {
  title: string;
  titleArgs: {};
  subtitle: string;
  subtitleArgs: {};
  icon: string;
  applyCustomNavColor: boolean;
  customNavColor: string;
  hasPageTools: boolean;
  pageToolsComponent: Type<any>;
  showSidebar: boolean;
  showAddon: boolean;
  addonComponent: Type<any>;
}
