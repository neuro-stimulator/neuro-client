import { Action, createReducer, on } from '@ngrx/store';

import * as SettingsActions from './settings.actions';
import { SettingsState } from './settings.state';

const DEFAULT_STATE: SettingsState = {
  localSettings: {
    application: {
      language: 'cz',
      disableTutorial: false
    },
    experiments: {
      showDescription: true,
      showTags: true,
      showCreationDate: true,
      showOutputType: true,
      showOutputCount: true,
      creationDateFormat: {
        showYears: true,
        showMonths: true,
        showDays: true,
        showHours: false,
        showMinutes: false,
        showSeconds: false,
        showMiliseconds: false,
      }
    },
    player: {},
    results: {},
  },
  localSettingsLoaded: false,
  serverSettings: {},
  working: false
};

export const settingsReducerKey = 'settings';

export function settingsReducer(settingsState: SettingsState | undefined, settingsAction: Action) {
  return createReducer(
    DEFAULT_STATE,
    on(SettingsActions.actionLocalSettingsCreate, (state: SettingsState, action) => ({
      ...state,
      localSettings: { ...DEFAULT_STATE.localSettings },
      localSettingsLoaded: true,
      working: false
    })),
    on(SettingsActions.actionLocalSettingsDone, (state: SettingsState, action) => ({
      ...state,
      localSettings: action.settings,
      localSettingsLoaded: true,
      working: false
    })),
    on(SettingsActions.actionServerSettingsDone, (state: SettingsState, action) => ({
      ...state,
      serverSettings: action.serverSettings,
      working: false
    }))
  )(settingsState, settingsAction);
}
