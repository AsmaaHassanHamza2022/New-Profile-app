import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromjobActions from './joblist.actions';
import { Observable, catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import { extractDocumentChangeActionData } from 'src/app/shared/utilities/data';
import { Job, JobCreateRequest } from './joblist.model';

@Injectable()
export class jobsEffects {
  public createdJobId: any;

  constructor(private actions$: Actions, private afs: AngularFirestore) {}

  ReadJobList$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromjobActions.ReadJobs),
      switchMap(() =>
        this.afs
          .collection('jobs')
          .snapshotChanges()
          .pipe(
            take(1),
            map((changes) =>
              changes.map((x) => extractDocumentChangeActionData(x))
            ),
            map((JobList: any[]) => ({
              type: fromjobActions.Types.READ_SUCCESS,
              JobList,
            })),
            catchError((err) =>
              of({ type: fromjobActions.Types.READ_ERROR, err })
            )
          )
      )
    )
  );

  AddNewJob$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromjobActions.CreateJob),
      map((actions) => actions.newCreateJob),
      map((job: JobCreateRequest) => ({
        ...job,
        created: new Date().toUTCString(),
      })),
      switchMap((request: JobCreateRequest) =>
        from(this.afs.collection('jobs').add(request)).pipe(
          // tap(async (res) => {
          //   const createdJobData = await res;
          //   this.createdJobId = createdJobData.id;
          // }),
          map((res) => ({ ...request, id: res.id})),
          map((job: Job) => ({
            type: fromjobActions.Types.CREATE_SUCCESS,
            newJob:job,
          })),
          catchError((err) =>
            of({ type: fromjobActions.Types.READ_ERROR, err })
          )
        )
      )
    )
  );

  UpdateJob$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromjobActions.updateJob),
      map((actions) => actions.updatedJob),
      map((job: Job) => ({
        ...job,
        created: new Date().toUTCString(),
      })),
      switchMap((job:Job) =>
        from(this.afs.collection('jobs').doc(job.id).set(job)).pipe(
          map(() => ({
            type: fromjobActions.Types.UPDATE_SUCCESS,updatedJob:job
            
           
          })),
          catchError((err) =>
            of({ type: fromjobActions.Types.UPDATE_ERROR, err })
          )
        )
      )
    )
  );

  DeleteJob$:Observable<any> =createEffect(()=>
  this.actions$.pipe(
    ofType(fromjobActions.deleteJob),
    map((action)=>action.jobId),
    switchMap(id =>
      from(this.afs.collection('jobs').doc(id).delete()).pipe(
          map(() =>({type:fromjobActions.Types.DELETE_SUCCESS ,jobId:id})),
          catchError(err => of({type:fromjobActions.Types.DELETE_ERROR ,err}))
      )
  )
  )
   )
}
