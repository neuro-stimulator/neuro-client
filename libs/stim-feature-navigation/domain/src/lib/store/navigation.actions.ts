import { createAction, props } from "@ngrx/store";
import { Type } from "@angular/core";

export const actionNavigationChange = createAction('[Navigation] change',
  props<{ title: string, applyCustomNavColor: boolean, pageToolsComponent: Type<any>, hasPageTools: boolean, addonComponent: Type<any> }>());

export const actionTitleArgsChange = createAction('[Navigation] title args change', props<{ titleArgs: {} }>());
export const actionSubtitleChange = createAction('[Navigation] subtitle change', props<{ subtitle: string }>());
export const actionSubtitleArgsChange = createAction('[Navigation] subtitle args change', props<{ subtitleArgs: {} }>());
export const actionIconChange = createAction('[Navigation] icon change', props<{ icon: string }>());
export const actionCustomNavColorChange = createAction('[Navigation] custom nav color change', props<{ customNavColor: string }>());

export const actionToggleSidebar = createAction('[Navigation] toggleSidebarVisibility sidebar visibility', props<{}>());
export const actionSetShowSidebar = createAction('[Navigation] set sidebar visibility', props<{ showSidebar: boolean }>());
export const actionSetShowAddon = createAction('[Navigation] set addon visibility', props<{ showAddon: boolean }>());
