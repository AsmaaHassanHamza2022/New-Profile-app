import { createAction, props } from "@ngrx/store";
import { Dictionaries } from "./dictionaries.model";

export enum Types{
    READ='[Dictionaries] read: start',
    READ_SUCCESS='[Dictionaries] read: success',
    READ_ERROR='[Dictionaries] read: error'
}

export const Read = createAction(Types.READ);
export const Read_Success = createAction(Types.READ_SUCCESS ,props<{dictinaries:Dictionaries}>());
export const Read_Error = createAction(Types.READ_ERROR ,props<{error:any}>());

