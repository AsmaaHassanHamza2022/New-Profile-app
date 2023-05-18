import { createAction, props } from "@ngrx/store";
import { User } from "./employeeList.model";


export enum Types {
    READ = '[Employees] Read: Start',
    READ_SUCCESS = '[Employees] Read: Success',
    READ_ERROR = '[Employees] Read: Error'
}

export const ReadEmployeesList =createAction(Types.READ)
export const ReadEmployeesListSuccess =createAction(Types.READ_SUCCESS,props<{employees:User[]}>())
export const ReadEmployeesListError =createAction(Types.READ_ERROR,props<{error:string}>())