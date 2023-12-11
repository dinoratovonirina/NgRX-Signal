import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userFeatureKey, userState } from "../../reducers/userReducer";

const userFeatureSelect = createFeatureSelector<userState>(userFeatureKey);

export const loadUserSelect = createSelector(
  userFeatureSelect,
  (user) => user.users
);
