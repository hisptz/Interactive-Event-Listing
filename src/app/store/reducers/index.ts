import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducer as currentUserReducer, CurrentUserState } from './current-user.reducer';
import { reducer as analyticsReducer, AnalyticsState } from './analytics.reducer';

export interface AppState {
  currentUser: CurrentUserState;
  analytics: AnalyticsState;
}

export const reducers: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer,
  analytics: analyticsReducer
};

export const getRootState = (state: AppState) => state;

export const getCurrentUserState = createSelector(getRootState, (state: AppState) => state.currentUser);
export const getAnalyticsState = createSelector(getRootState, (state: AppState) => state.analytics);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
