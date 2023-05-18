import { ActionReducerMap } from "@ngrx/store";
import { EmployeesReducer, ListState } from "./list/employeeList.reducers";
import { EmployeesEffect } from "./list/employeeList.effect";




export interface EmployeeState {
   list:ListState
}

export const reducers: ActionReducerMap<EmployeeState> = {
    list:EmployeesReducer
};

export const effects: any[] = [
    EmployeesEffect
];

