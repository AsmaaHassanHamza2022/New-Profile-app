import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Job } from "./joblist.model";
import { createReducer, on } from "@ngrx/store";
import * as fromjobActions from './joblist.actions'

export const listAdapter: EntityAdapter<Job> = createEntityAdapter<Job>();
export interface ListState extends EntityState<Job> {
    loading: boolean |null;
    error: string |null;
}

export const initialState: ListState = listAdapter.getInitialState({
    loading: null,
    error: null
});

export const jobReducers=createReducer(initialState ,
    // read Job list
    on(fromjobActions.ReadJobs ,(state)=>({...state,loading:true})),
    on(fromjobActions.ReadJobsSuccess ,(state,{JobList})=>{
        return  listAdapter.addMany(JobList,{...state ,loading:false})
    }),
    on(fromjobActions.ReadJobsError ,(state,{error})=>({...state,loading:false,error:error})),

    // Add new job
    on(fromjobActions.CreateJob ,(state)=>({...state,loading:true})),
    on(fromjobActions.CreateJobSuccess ,(state,{newJob})=>{
        return  listAdapter.addOne(newJob,{...state ,loading:false})
    }),
    on(fromjobActions.CreateJobError ,(state,{error})=>({...state,loading:false,error:error})),

    // Update jobs
    on(fromjobActions.updateJob ,(state)=>({...state,loading:true})),
    on(fromjobActions.updateJobSuccess ,(state,{updatedJob})=>{
        return  listAdapter.updateOne({id:updatedJob.id ,changes:updatedJob},{...state ,loading:false})
    }),
    on(fromjobActions.updateJobError ,(state,{error})=>({...state,loading:false,error:error})),

    // Delete jobs
    on(fromjobActions.deleteJob ,(state)=>({...state,loading:true})),
    on(fromjobActions.deleteJobSuccess ,(state,{jobId})=>{
        return  listAdapter.removeOne(jobId,{...state ,loading:false})
    }),
    on(fromjobActions.deleteJobError ,(state,{error})=>({...state,loading:false,error:error})),

    
    
    
    
    
    
    )
