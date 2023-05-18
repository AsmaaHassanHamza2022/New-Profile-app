import { ActionReducerMap} from "@ngrx/store";
import { ProfileFormData } from "./profileForm.model";
import { userReducers } from "./profileForm.reducers";
import { UserState, userReducer } from "./user/user.reducers";
import { UserEffect } from "./user/user.effect";

export interface ProfileState {
    form:ProfileFormData;
    user:UserState;
}

export const reducers: ActionReducerMap<ProfileState> = {
    form:userReducers,
    user:userReducer
};

export const effects: any[] = [
    UserEffect
];

