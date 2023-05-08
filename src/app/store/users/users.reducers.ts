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
    on(UserActions.Init,(state)=>({...state ,loading:true})),
    on(UserActions.InitAuthorized,(state,{user,uId})=>({...state ,entity:user,uid:uId ,loading:false})),
    on(UserActions.InitUnAuthorized,(state)=>({...state,loading:false})),
    on(UserActions.InitError,(state,{error})=>({...state,loading:false,error:error})),

    on(UserActions.SignUp,(state)=>({...state ,loading:true})),
    on(UserActions.SignUpSuccess,(state ,{uId})=>({...state ,loading:false ,uid:uId})),
    on(UserActions.SignUpError,(state ,{error})=>({...state ,loading:false ,error:error})),

    on(UserActions.SignIn ,(state)=>({...state,loading:true})),
    on(UserActions.SignInSuccess,(state 
        ,{user ,uId})=>{
            debugger
            return {...state ,uid:uId ,loading:false ,entity:user ,error:null};
        }),
    on(UserActions.SignInError,(state,{error})=>({...state ,error:error ,loading:false})),


    on(UserActions.SignOut ,(state)=>({...state ,loading:true})),
    on(UserActions.SignOutSuccess ,(state)=>({...initialState})),
    on(UserActions.SignOutError ,(state ,{error})=>({...initialState ,error:error})),

    

    )