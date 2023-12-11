import { createReducer, on, props } from '@ngrx/store';
import * as fromUserAction from '../Actions/user/user.action';
import { User } from '../../../interfaces/user.interface';

export const userFeatureKey = 'users';

export interface userState {
  readonly [userFeatureKey]: User[];
}

export const initialeState = {
  users: [],
};

export const usersReducer = createReducer<userState>(
  initialeState,
  on(fromUserAction.loadUsers, (state) => {
    return { ...state };
  }),
  on(fromUserAction.loadUsersSuccess, (state, props) => {
    return {
      ...state,
      users: props.users,
    };
  })
);
