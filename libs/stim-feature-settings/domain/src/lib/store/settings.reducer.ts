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
  viewFragment: ''
};

export const settingsReducerKey = 'settings';

export function settingsReducer(settingsState: SettingsState | undefined, settingsAction: Action) {
  return createReducer(
    DEFAULT_STATE,
    on(SettingsActions.actionLocalSettingsCreate, (state: SettingsState, action) => ({
      ...state,
      localSettings: { ...DEFAULT_STATE.localSettings },
      localSettingsLoaded: true
    })),
    on(SettingsActions.actionLocalSettingsDone, (state: SettingsState, action) => ({
      ...state,
      localSettings: action.settings,
      localSettingsLoaded: true
    })),
    on(SettingsActions.actionSaveLocalSettingsDone, (state: SettingsState, action) => ({
      ...state,
      localSettings: action.settings
    })),
    on(SettingsActions.actionServerSettingsDone, (state: SettingsState, action) => ({
      ...state,
      serverSettings: action.serverSettings,
    })),
    on(SettingsActions.actionSaveServerSettingsDone, (state: SettingsState, action) => ({
      ...state,
      serverSettings: action.serverSettings
    })),
    on(SettingsActions.actionSettingsChangeFragment, (state: SettingsState, action) => ({
      ...state,
      viewFragment: action.fragment
    }))
  )(settingsState, settingsAction);
}