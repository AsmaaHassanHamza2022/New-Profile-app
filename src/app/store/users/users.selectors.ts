import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./users.reducers";


export const getUserState =createFeatureSelector<UserState>('users');


export const getUser =createSelector(
    getUserState,
    (state)=>state.entity
)

export const getLoading =createSelector(
    getUserState,
    (state)=>state.loading
)

export const getIsAuthorized =createSelector(
    getUserState,
    (state)=>!!state.uid
)