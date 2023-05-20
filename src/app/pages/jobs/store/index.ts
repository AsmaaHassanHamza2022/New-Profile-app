import { ActionReducerMap } from "@ngrx/store";
import { ListState, jobReducers } from "./JobList/joblist.reducers";
import { jobsEffects } from "./JobList/joblist.effects";


export interface JobsState {
    list:ListState;
}

export const reducers: ActionReducerMap<JobsState> = {
    list:jobReducers
};

export const effects: any[] = [
    jobsEffects
];
