import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromUserAction from '../../Actions/user/user.action';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../../interfaces/user.interface';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserAction.loadUsers),
      mergeMap(() =>
        this.userService.listUsers.pipe(
          map((users: User[]) => fromUserAction.loadUsersSuccess({ users })),
          catchError((error) =>
            of(fromUserAction.loadUsersFailure({ error: error }))
          )
        )
      )
    )
  );

  constructor(private action$: Actions, private userService: UsersService) {}
}
