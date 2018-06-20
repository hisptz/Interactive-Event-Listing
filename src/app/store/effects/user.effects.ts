import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { UserActionTypes, AddUser, LoadCurrentUserFail } from '../actions';
import { map, flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../models/current-user.model';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUser),
    flatMap(() =>
      this.userService.loadCurrentUser().pipe(
        map((user: User) => new AddUser(user)),
        catchError((error: any) => of(new LoadCurrentUserFail(error)))
      )
    )
  );
}
