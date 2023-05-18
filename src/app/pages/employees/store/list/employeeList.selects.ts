import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "..";
import { ListState } from "./employeeList.reducers";


export const getEmployeesState = createFeatureSelector<EmployeeState>('employeesList');

export const getListState = createSelector(
    getEmployeesState,
    (state: EmployeeState) => state.list
);

export const getItems = createSelector(
    getListState,
    (state: ListState) => state.items 
);

export const getLoading = createSelector(
    getListState,
    (state: ListState) => state.loading
);