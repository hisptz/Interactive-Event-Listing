import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Analytics } from '../../models/analytics.model';
import { AnalyticsActionTypes, AnalyticsActions } from '../actions/analytics.actions';

export interface AnalyticsState extends EntityState<Analytics> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  analytics: any;
}

export const adapter: EntityAdapter<Analytics> = createEntityAdapter<Analytics>();

export const initialState: AnalyticsState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  analytics: null,
  loaded: false
});

export function reducer(state = initialState, action: AnalyticsActions): AnalyticsState {
  switch (action.type) {
    case AnalyticsActionTypes.LoadAnalytics: {
      return { ...state, loading: true, loaded: false };
    }

    case AnalyticsActionTypes.AddAnalytics: {
      const analytics = action.analytics;
      return { ...state, analytics, loaded: true, loading: false };
    }

    default: {
      return state;
    }
  }
}

export const getAnalytics = (state: AnalyticsState) => state.analytics;
export const getAnalyticsLoaded = (state: AnalyticsState) => state.loaded;
export const getAnalyticsLoading = (state: AnalyticsState) => state.loading;
