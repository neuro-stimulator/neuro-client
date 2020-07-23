import { NavigationState } from './navigation.state';
import { Action, createReducer, on } from '@ngrx/store';

import * as NavigationActions from './navigation.actions';

export const navigationReducerKey = 'navigation';

export function navigationReducer(
  navigationState: NavigationState,
  navigationAction: Action
) {
  return createReducer(
    {
      title: '',
      titleArgs: {},
      subtitle: 'SHARE.SERIAL.STATUS_CONNECTING',
      subtitleArgs: {},
      icon: 'fa-circle text-warning',
      applyCustomNavColor: false,
      customNavColor: '',
      hasPageTools: false,
      showSidebar: false,
      showAddon: false,
    },
    on(
      NavigationActions.actionNavigationChange,
      (state: NavigationState, action) => ({
        ...state,
        title: action.title,
        titleArgs: {},
        subtitle: state.subtitle,
        subtitleArgs: state.subtitleArgs,
        icon: state.icon,
        applyCustomNavColor: action.applyCustomNavColor,
        customNavColor: '',
        hasPageTools: action.hasPageTools,
      })
    ),
    on(
      NavigationActions.actionTitleArgsChange,
      (state: NavigationState, action) => ({
        ...state,
        titleArgs: action.titleArgs,
      })
    ),
    on(
      NavigationActions.actionSubtitleChange,
      (state: NavigationState, action) => ({
        ...state,
        subtitle: action.subtitle,
      })
    ),
    on(
      NavigationActions.actionSubtitleArgsChange,
      (state: NavigationState, action) => ({
        ...state,
        subtitleArgs: action.subtitleArgs,
      })
    ),
    on(
      NavigationActions.actionIconChange,
      (state: NavigationState, action) => ({
        ...state,
        icon: action.icon,
      })
    ),
    on(
      NavigationActions.actionCustomNavColorChange,
      (state: NavigationState, action) => ({
        ...state,
        customNavColor: action.customNavColor,
      })
    ),

    on(
      NavigationActions.actionToggleSidebar,
      (state: NavigationState, action) => ({
        ...state,
        showSidebar: !state.showSidebar,
      })
    ),
    on(
      NavigationActions.actionSetShowSidebar,
      (state: NavigationState, action) => ({
        ...state,
        showSidebar: action.showSidebar,
      })
    ),
    on(
      NavigationActions.actionSetShowAddon,
      (state: NavigationState, action) => ({
        ...state,
        showAddon: action.showAddon,
      })
    )
  )(navigationState, navigationAction);
}
