import { createAction, props } from "@ngrx/store";

import { ServerSettings, Settings } from "../..";

export const actionLocalSettingsRequest = createAction('[Settings] Local settings request', props<{}>());
export const actionLocalSettingsDone = createAction('[Settings] Local settings done', props<{settings: Settings}>());
export const actionLocalSettingsCreate = createAction('[Settings] Local settings create new from default', props<{}>());

export const actionServerSettingsRequest = createAction('[Settings] Server settings request');
export const actionServerSettingsDone = createAction('[Settings] Server settings request done', props<{serverSettings: ServerSettings}>());
export const actionServerSettingsFail = createAction('[Settings] Server settings request fail', props<{}>());
