import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/current-user.model';
import { UserActions, UserActionTypes } from '../actions/current-user.actions';

export interface CurrentUserState extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: CurrentUserState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: UserActions): CurrentUserState {
  switch (action.type) {
    case UserActionTypes.AddCurrentUser: {
      return adapter.addOne(action.currentUser, state);
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

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
