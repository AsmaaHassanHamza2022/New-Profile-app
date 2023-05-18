import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import 'firebase/firestore';
import { ReadUserProfile, Types } from './user.actions';
import { User } from 'src/app/models/backend/user';

@Injectable()
export class UserEffect {
  public authUserData: any;
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {}

  getUser$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
        ofType(ReadUserProfile),
        map((action)=> action.userId),
        switchMap((userId) =>
            this.afs.doc<User>(`users/${userId}`).valueChanges().pipe(
                take(1),
                tap((user) => console.log('success user = ', user)),
                map((user) =>({type:Types.READ_SUCCESS ,user})),
                catchError(err => of({type:Types.READ_ERROR ,err}))
            )
        )
    )
  );

  

 
}



