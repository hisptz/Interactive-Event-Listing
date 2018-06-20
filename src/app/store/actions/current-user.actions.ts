import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../../models/current-user.model';

export enum UserActionTypes {
  LoadCurrentUser = '[CurrentUser] Load CurrentUser',
  LoadCurrentUserFail = '[CurrentUser] Load CurrentUser Fail',
  AddCurrentUser = '[CurrentUser] Add CurrentUser',
  UpsertCurrentUser = '[CurrentUser] Upsert CurrentUser',
  AddCurrentUsers = '[CurrentUser] Add CurrentUsers',
  UpsertCurrentUsers = '[CurrentUser] Upsert CurrentUsers',
  UpdateCurrentUser = '[CurrentUser] Update CurrentUser',
  UpdateCurrentUsers = '[CurrentUser] Update CurrentUsers',
  DeleteCurrentUser = '[CurrentUser] Delete CurrentUser',
  DeleteCurrentUsers = '[CurrentUser] Delete CurrentUsers',
  ClearCurrentUsers = '[CurrentUser] Clear CurrentUsers'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadCurrentUser;
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddCurrentUser;

  constructor(public currentUser: User) {}
}

export class UpsertUser implements Action {
  readonly type = UserActionTypes.UpsertCurrentUser;

  constructor(public currentUser: User) {}
}

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateCurrentUser;

  constructor(public currentUser: Update<User>) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteCurrentUser;

  constructor(public id: string) {}
}

export class LoadCurrentUserFail implements Action {
  readonly type = UserActionTypes.LoadCurrentUserFail;

  constructor(public error: any) {}
}

export type UserActions = LoadUser | AddUser | UpsertUser | UpdateUser | DeleteUser | LoadCurrentUserFail;
