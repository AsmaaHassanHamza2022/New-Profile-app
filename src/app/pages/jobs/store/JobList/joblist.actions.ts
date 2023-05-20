import { createAction, props } from "@ngrx/store";
import { Job, JobCreateRequest } from "./joblist.model";


export enum Types {

    READ = '[Jobs] Read: Start',
    READ_SUCCESS = '[Jobs] Read: Success',
    READ_ERROR = '[Jobs] Read: Error',

    CREATE = '[Jobs] Create: Start',
    CREATE_SUCCESS = '[Jobs] Create: Success',
    CREATE_ERROR = '[Jobs] Create: Error',

    UPDATE = '[Jobs] Update: Start',
    UPDATE_SUCCESS = '[Jobs] Update: Success',
    UPDATE_ERROR = '[Jobs] Update: Error',

    DELETE = '[Jobs] Delete: Start',
    DELETE_SUCCESS = '[Jobs] Delete: Success',
    DELETE_ERROR = '[Jobs] Delete: Error',
}


// read all jobs 
export const ReadJobs=createAction(Types.READ);
export const ReadJobsSuccess=createAction(Types.READ_SUCCESS,props<{JobList:Job[]}>());
export const ReadJobsError=createAction(Types.READ,props<{error:string}>());


// create New job
export const CreateJob=createAction(Types.CREATE,props<{newCreateJob:JobCreateRequest}>());
export const CreateJobSuccess=createAction(Types.CREATE_SUCCESS,props<{newJob:Job}>());
export const CreateJobError=createAction(Types.CREATE_ERROR,props<{error:string}>());

// update job
export const updateJob=createAction(Types.UPDATE,props<{updatedJob:Job}>())
export const updateJobSuccess=createAction(Types.UPDATE_SUCCESS,props<{updatedJob:Job}>())
export const updateJobError=createAction(Types.UPDATE_ERROR,props<{error:string}>())

//delete job
export const deleteJob=createAction(Types.DELETE,props<{jobId:string}>())
export const deleteJobSuccess=createAction(Types.DELETE_SUCCESS,props<{jobId:string}>())
export const deleteJobError=createAction(Types.DELETE_ERROR,props<{error:string}>())