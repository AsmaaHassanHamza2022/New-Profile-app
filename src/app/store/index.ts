
import { ActionReducerMap } from '@ngrx/store';
import * as fromDictionaries from './dictionaries/dictionaries.reducers'
import * as fromDictionariesEffect from './dictionaries/dictionaries.effects'
import { UserState, userRedsucers } from './users/users.reducers';
import { UserEffects } from './users/users.effects';

export interface State{
    dictionaries: fromDictionaries.DictionariesState;
    users:UserState
}

export const reducers :ActionReducerMap<State> ={
    dictionaries:fromDictionaries.dictionariesReducer,
    users:userRedsucers
}


export const effects =[
    fromDictionariesEffect.DictionariesEffects,
    UserEffects
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