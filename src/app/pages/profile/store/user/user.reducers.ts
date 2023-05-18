import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/backend/user";

import * as userAction from './user.actions';


export interface UserState {
    entity: User;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    entity: {} as User,
    loading: false,
    error: ''
};


export const  userReducer =createReducer(initialState,
    on(userAction.ReadUserProfile,(state,)=>({...state, loading:true})),
    on(userAction.ReadUserProfileSuccess,(state,{user})=>({...state,entity:user,loading:false})),
    on(userAction.ReadUserProfileError,(state,{error})=>({...state, loading:false ,error:error})),
   
    )