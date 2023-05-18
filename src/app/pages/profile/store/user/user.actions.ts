import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/backend/user";



export enum Types {
    READ = '[Profile] [User] Read: Start',
    READ_SUCCESS = '[Profile] [User] Read: Success',
    READ_ERROR = '[Profile] [User] Read: Error',
    CLEAR = '[Profile] [User] Clear'
}

export const ReadUserProfile=createAction(Types.READ ,props<{userId:string}>())
export const ReadUserProfileSuccess=createAction(Types.READ_SUCCESS ,props<{user:User}>())
export const ReadUserProfileError=createAction(Types.READ_ERROR ,props<{error:string}>())
export const ClearProfile=createAction(Types.CLEAR)