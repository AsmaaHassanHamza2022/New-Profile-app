import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/backend/user";
import * as UserActions from "./users.actions";


export interface UserState {
    entity: User | null;
    uid: string | null;
    loading: boolean  | null;
    error: string | null;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null
};


export const  userRedsucers =createReducer(initialState,
    on(UserActions.SignUp,(state)=>({...state ,loading:true})),
    on(UserActions.SignUpSuccess,(state ,{uId})=>({...state ,loading:false ,uid:uId})),
    on(UserActions.SignUpError,(state ,{error})=>({...state ,loading:false ,error:error})),


    )