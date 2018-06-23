import { createSelector } from '@ngrx/store';
import { getCurrentUserState } from '../reducers';
import * as fromUser from '../reducers/current-user.reducer';

export const selectCurrentUserId = createSelector(getCurrentUserState, fromUser.getSelectedUserId);

export const selectUserEntities = createSelector(getCurrentUserState, fromUser.selectUserEntities);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);
