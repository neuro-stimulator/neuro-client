import { createAction, props } from '@ngrx/store';
import { ConnectionStatus } from '@stechy1/diplomka-share';

export const actionAssetPlayerOpenRequest = createAction('[Asset Player] Open communication channel request');
export const actionAssetPlayerOpenRequestDone = createAction('[Asset Player] Open communication channel request done');
export const actionAssetPlayerOpenRequestFail = createAction('[Asset Player] Open communication channel request fail');

export const actionAssetPlayerCloseRequest = createAction('[Asset Player] Close communication channel request');
export const actionAssetPlayerCloseRequestDone = createAction('[Asset Player] Close communication channel request done');
export const actionAssetPlayerCloseRequestFail = createAction('[Asset Player] Close communication channel request fail');

export const actionAssetPlayerStatusRequest = createAction('[Asset Player] Status of communication channel request');
export const actionAssetPlayerStatusRequestDone = createAction('[Asset Player] Status of communication channel request done', props<{ status: ConnectionStatus }>());
export const actionAssetPlayerStatusRequestFail = createAction('[Asset Player] Status of communication channel request fail');

export const actionAssetPlayerSpawnRequest = createAction('[Asset Player] Spawn asset player');
export const actionAssetPlayerSpawnRequestDone = createAction('[Asset Player] Spawn asset player done');
export const actionAssetPlayerSpawnRequestFail = createAction('[Asset Player] Spawn asset player fail');

export const actionAssetPlayerKillRequest = createAction('[Asset Player] Kill asset player');
export const actionAssetPlayerKillRequestDone = createAction('[Asset Player] Kill asset player done');
export const actionAssetPlayerKillRequestFail = createAction('[Asset Player] Kill asset player fail');
