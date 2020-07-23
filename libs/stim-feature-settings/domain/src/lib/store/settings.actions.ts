import { createAction, props } from "@ngrx/store";

import { ServerSettings, Settings } from "../..";

export const actionLocalSettingsRequest = createAction('[Settings] Local settings request', props<{}>());
export const actionLocalSettingsDone = createAction('[Settings] Local settings done', props<{settings: Settings}>());
export const actionLocalSettingsCreate = createAction('[Settings] Local settings create new from default', props<{}>());

export const actionSaveLocalSettingsRequest = createAction('[Settings] Save local settings request', props<{settings: Settings}>());
export const actionSaveLocalSettingsDone = createAction('[Settings] Save local settings done', props<{settings: Settings}>());

export const actionServerSettingsRequest = createAction('[Settings] Server settings request', props<{}>());
export const actionServerSettingsDone = createAction('[Settings] Server settings request done', props<{serverSettings: ServerSettings}>());
export const actionServerSettingsFail = createAction('[Settings] Server settings request fail', props<{}>());

export const actionSaveServerSettingsRequest = createAction('[Settings] Save server settings request', props<{serverSettings: ServerSettings}>());
export const actionSaveServerSettingsDone = createAction('[Settings] Save server settings request done', props<{serverSettings: ServerSettings}>());
export const actionSaveServerSettingsFail = createAction('[Settings] Save server settings request fail', props<{}>());

export const actionSettingsChangeFragment = createAction('[Settings] Change fragment', props<{ fragment: string }>());
