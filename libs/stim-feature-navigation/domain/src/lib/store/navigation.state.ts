import { AppState } from '@diplomka-frontend/stim-lib-store';

export interface NavigationState extends AppState {
  title: string;
  titleArgs: {};
  subtitle: string;
  subtitleArgs: {};
  icon: string;
  applyCustomNavColor: boolean;
  customNavColor: string;
  hasPageTools: boolean;
  showSidebar: boolean;
  showAddon: boolean;
}
