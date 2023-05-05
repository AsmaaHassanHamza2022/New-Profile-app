
import { ActionReducerMap } from '@ngrx/store';
import * as fromDictionaries from './dictionaries/dictionaries.reducers'
import * as fromDictionariesEffect from './dictionaries/dictionaries.effects'

export interface State{
    dictionaries: fromDictionaries.DictionariesState;
}

export const reducers :ActionReducerMap<State> ={
    dictionaries:fromDictionaries.dictionariesReducer
}


export const effects =[
    fromDictionariesEffect.DictionariesEffects
]

// export interface State {
//     dictionaries: fromDictionaries.DictionariesState;
//     user: fromUser.UserState;
// }

// export const reducers: ActionReducerMap<State> = {
//     dictionaries: fromDictionaries.reducer,
//     user: fromUser.reducer
// };

// export const effects = [
//     fromDictionaries.DictionariesEffects,
//     fromUser.UserEffects
// ];