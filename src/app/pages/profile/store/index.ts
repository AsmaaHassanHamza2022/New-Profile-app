import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { ProfileFormData } from "./profileForm.model";
import { userReducers } from "./profileForm.reducers";

export interface ProfileState {
    form:ProfileFormData;
    // user: fromUser.UserState;
}

export const reducers: ActionReducerMap<ProfileState> = {
    form:userReducers,
    // user: fromUser.reducer
};

export const effects: any[] = [];

