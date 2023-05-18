import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap, take, tap } from "rxjs";
import { ReadEmployeesList, Types } from "./employeeList.actions";
import { extractDocumentChangeActionData } from "src/app/shared/utilities/data";
import { User } from "src/app/models/backend/user";

@Injectable()
export class EmployeesEffect {
  public authUserData: any;
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {}

  getEmployees$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
        ofType(ReadEmployeesList),
        switchMap(() =>
            this.afs.collection<User>('users', ref => ref.where('roleId', '==', 'employee')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x, false))),
                map((employees: any[]) => ({type:Types.READ_SUCCESS ,employees})),
                catchError(err => of({type:Types.READ_ERROR ,err}))
            )
        )
    )
  );

  

 
}