import { AppState } from '@neuro-client/stim-lib-store';

export interface NavigationState extends AppState {
  title: string;
  titleArgs: Record<string, unknown>;
  subtitle: string;
  subtitleArgs: Record<string, unknown>;
  icon: string;
  applyCustomNavColor: boolean;
  customNavColor: string;
  hasPageTools: boolean;
  showSidebar: boolean;
  showAddon: boolean;
}
