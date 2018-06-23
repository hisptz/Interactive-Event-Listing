import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/current-user.model';
import { UserActions, UserActionTypes } from '../actions/current-user.actions';

export interface CurrentUserState extends EntityState<User> {
  // additional entities state properties
  selectedUserId: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: CurrentUserState = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null
});

export function reducer(state = initialState, action: UserActions): CurrentUserState {
  switch (action.type) {
    case UserActionTypes.AddCurrentUser: {
      const { id: selectedUserId } = action.currentUser;
      return adapter.addOne(action.currentUser, { ...state, selectedUserId });
    }

    case UserActionTypes.UpsertCurrentUser: {
      return adapter.upsertOne(action.currentUser, state);
    }

    case UserActionTypes.UpdateCurrentUser: {
      return adapter.updateOne(action.currentUser, state);
    }

    case UserActionTypes.DeleteCurrentUser: {
      return adapter.removeOne(action.id, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedUserId = (state: CurrentUserState) => state.selectedUserId;

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = adapter.getSelectors();
