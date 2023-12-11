import { createAction, props } from '@ngrx/store';
import { User } from '../../../../interfaces/user.interface';

export const loadUsers = createAction('[User] load Users');

export const loadUsersSuccess = createAction(
  '[User] load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] load Users Failure',
  props<{ error: Error | string }>()
);
