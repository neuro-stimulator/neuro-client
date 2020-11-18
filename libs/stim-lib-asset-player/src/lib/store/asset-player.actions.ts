import { createAction, props } from '@ngrx/store';

export const actionAssetPlayerOpenRequest = createAction('[Asset Player] Open communication channel request');
export const actionAssetPlayerOpenRequestDone = createAction('[Asset Player] Open communication channel request done');
export const actionAssetPlayerOpenRequestFail = createAction('[Asset Player] Open communication channel request fail');

export const actionAssetPlayerCloseRequest = createAction('[Asset Player] Close communication channel request');
export const actionAssetPlayerCloseRequestDone = createAction('[Asset Player] Close communication channel request done');
export const actionAssetPlayerCloseRequestFail = createAction('[Asset Player] Close communication channel request fail');

export const actionAssetPlayerStatusRequest = createAction('[Asset Player] Status of communication channel request');
export const actionAssetPlayerStatusRequestDone = createAction('[Asset Player] Status of communication channel request done', props<{ connected: boolean }>());
export const actionAssetPlayerStatusRequestFail = createAction('[Asset Player] Status of communication channel request fail');
