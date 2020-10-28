import { createAction, props } from '@ngrx/store';

export const actionNavigationChange = createAction(
  '[Navigation] change',
  props<{
    title: string;
    applyCustomNavColor: boolean;
    hasPageTools: boolean;
  }>()
);

export const actionTitleArgsChange = createAction('[Navigation] title args change', props<{ titleArgs: Record<string, unknown> }>());
export const actionSubtitleChange = createAction('[Navigation] subtitle change', props<{ subtitle: string }>());
export const actionSubtitleArgsChange = createAction('[Navigation] subtitle args change', props<{ subtitleArgs: Record<string, unknown> }>());
export const actionIconChange = createAction('[Navigation] icon change', props<{ icon: string }>());
export const actionCustomNavColorChange = createAction('[Navigation] custom nav color change', props<{ customNavColor: string }>());

export const actionToggleSidebar = createAction('[Navigation] toggleSidebarVisibility sidebar visibility');
export const actionSetShowSidebar = createAction('[Navigation] set sidebar visibility', props<{ showSidebar: boolean }>());
export const actionSetShowAddon = createAction('[Navigation] set addon visibility', props<{ showAddon: boolean }>());
