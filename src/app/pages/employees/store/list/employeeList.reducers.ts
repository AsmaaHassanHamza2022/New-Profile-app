import { createReducer, on } from "@ngrx/store";
import { User } from "./employeeList.model";
import { ReadEmployeesList, ReadEmployeesListError, ReadEmployeesListSuccess } from "./employeeList.actions";


export interface ListState {
    items: User[];
    loading: boolean;
    error: string;
}

export const initialState: ListState = {
    items: [],
    loading: false,
    error: ''
};

export const  EmployeesReducer =createReducer(initialState,
    on(ReadEmployeesList,(state)=>{
        debugger
        return {...state ,loading:true}
    }),
    on(ReadEmployeesListSuccess,(state,{employees})=>{
        debugger
        return ({...state ,items:employees,loading:false})
    }),
    on(ReadEmployeesListError,(state,{error})=>({...state ,loading:false,error:error})),
);