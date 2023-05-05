import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/backend/user";
import { EmailPasswordCredentials } from "./users.model";

export enum Types{
    SIGN_IN_EMAIL = '[User] Sign In with email: Start',
    SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Success',
    SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

    SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
    SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Success',
    SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

    SIGN_OUT = '[User] Sign Out: Start',
    SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
    SIGN_OUT_ERROR = '[User] Sign Out: Error',

}
// Sign in
export const SignIn =createAction(Types.SIGN_IN_EMAIL ,props<{credential:EmailPasswordCredentials}>());
export const SignInSuccess =createAction(Types.SIGN_IN_EMAIL_SUCCESS ,props<{user:User ,uId:string}>());
export const SignInError =createAction(Types.SIGN_IN_EMAIL_ERROR ,props<{error:string}>());


// Sign up
export const SignUp =createAction(Types.SIGN_UP_EMAIL ,props<{credential:EmailPasswordCredentials}>());
export const SignUpSuccess =createAction(Types.SIGN_UP_EMAIL_SUCCESS ,props<{uId:string}>());
export const SignUpError =createAction(Types.SIGN_UP_EMAIL_ERROR ,props<{error:string}>());


// Sign out
export const SignOut =createAction(Types.SIGN_OUT);
export const SignOutSuccess =createAction(Types.SIGN_OUT_SUCCESS);
export const SignOutError =createAction(Types.SIGN_OUT_ERROR,props<{error:string}>());


