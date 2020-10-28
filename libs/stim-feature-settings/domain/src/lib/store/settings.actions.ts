import { createAction, props } from '@ngrx/store';

import { ServerSettings, Settings } from '../..';

export const actionLocalSettingsRequest = createAction('[Settings] Local settings request');
export const actionLocalSettingsInvoke = createAction('[Settings] Local settings invoke request');
export const actionLocalSettingsDone = createAction('[Settings] Local settings done', props<{ settings: Settings }>());
export const actionLocalSettingsCreate = createAction('[Settings] Local settings create new from default');

export const actionSaveLocalSettingsRequest = createAction('[Settings] Save local settings request', props<{ settings: Settings }>());
export const actionSaveLocalSettingsDone = createAction('[Settings] Save local settings done', props<{ settings: Settings }>());

export const actionServerSettingsRequest = createAction('[Settings] Server settings request');
export const actionServerSettingsDone = createAction('[Settings] Server settings request done', props<{ serverSettings: ServerSettings }>());
export const actionServerSettingsFail = createAction('[Settings] Server settings request fail', props<{ serverSettings: ServerSettings }>());

export const actionSaveServerSettingsRequest = createAction('[Settings] Save server settings request', props<{ serverSettings: ServerSettings }>());
export const actionSaveServerSettingsDone = createAction('[Settings] Save server settings request done', props<{ serverSettings: ServerSettings }>());
export const actionSaveServerSettingsFail = createAction('[Settings] Save server settings request fail');

export const actionSettingsChangeFragment = createAction('[Settings] Change fragment', props<{ fragment: string }>());

export const actionServerSeedDatabaseRequest = createAction('[Settings] Seed database request');
export const actionServerSeedDatabaseDone = createAction('[Settings] Seed database request done', props<{ statistics: Record<string, unknown> }>());
export const actionServerSeedDatabaseFail = createAction('[Settings] Seed database request fail');

export const actionServerTruncateDatabaseRequest = createAction('[Settings] Truncate database request');
export const actionServerTruncateDatabaseDone = createAction('[Settings] Truncate database request done', props<{ statistics: Record<string, unknown> }>());
export const actionServerTruncateDatabaseFail = createAction('[Settings] Truncate database request fail');
