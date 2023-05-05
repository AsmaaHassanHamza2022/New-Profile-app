import { createReducer ,on } from "@ngrx/store";
import { Dictionaries } from "./dictionaries.model";
import * as DictionariesActions from './dictionaries.actions'



export interface DictionariesState {
    entities: Dictionaries | null;
    loading: boolean | null;
    error: string | null;
}

const initialState: DictionariesState = {
    entities: null,
    loading: null,
    error: null
};

export const dictionariesReducer = createReducer(
    initialState,
    on(DictionariesActions.Read,state => ({...state ,loading :true ,error :null})),
    on(DictionariesActions.Read_Success,(state ,{dictinaries})=> ({...state ,entities:dictinaries,loading :false ,error :null})),
    on(DictionariesActions.Read_Error,state => ({...state ,loading :false ,error :null})),

   
  );