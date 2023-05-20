import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobsState } from "..";
import { listAdapter } from "./joblist.reducers";



export const getJobsState = createFeatureSelector<JobsState>('jobs');

export const getListState = createSelector(
    getJobsState,
    (state: JobsState) => state.list
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = listAdapter.getSelectors(getListState);

export const selectEntityById = createSelector(
    selectEntities,
    (entities:any, props: { id: string }) => {
        return entities[props.id];
    }
);


export const getLoading = createSelector(
    getListState,
    (state) => {
        return state.loading;
    }
);