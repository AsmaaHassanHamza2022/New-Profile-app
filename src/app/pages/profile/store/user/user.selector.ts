import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "../index";
import { UserState } from "./user.reducers";



export const getProfileState = createFeatureSelector<ProfileState>('profile');


export const getUserState = createSelector(
    getProfileState,
    (state: ProfileState) => state.user
);

export const getUser = createSelector(
    getUserState,
    (state: UserState) => state.entity
);

export const getLoading = createSelector(
    getUserState,
    (state: UserState) => state.loading
);

export const getRole = createSelector(
    getUserState,
    (state: UserState) => state.entity.role
);
