import { createSelector } from '@ngrx/store';
import { getAnalyticsState } from '../reducers';
import * as fromAnalytics from '../reducers/analytics.reducer';

export const selectAnalytics = createSelector(getAnalyticsState, fromAnalytics.getAnalytics);

export const selectAnalyticsLoading = createSelector(getAnalyticsState, fromAnalytics.getAnalyticsLoading);
export const selectAnalyticsLoaded = createSelector(getAnalyticsState, fromAnalytics.getAnalyticsLoading);
