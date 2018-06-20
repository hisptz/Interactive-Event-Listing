import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { reducer as currentUserReducer, CurrentUserState } from './current-user.reducer';

export interface AppState {
  currentUser: CurrentUserState;
}

export const reducers: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer
};

export const getRootState = (state: AppState) => state;

export const getCurrentUserState = createSelector(getRootState, (state: AppState) => state.currentUser);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
