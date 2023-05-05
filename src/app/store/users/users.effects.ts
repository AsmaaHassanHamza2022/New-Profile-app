import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignIn, SignOut, Types } from './users.actions';
import { Observable, catchError, from, map, of, switchMap, take, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EmailPasswordCredentials } from './users.model';
import { environment } from 'src/environments/environment';
import { SignUp } from './users.actions';
import { User } from 'src/app/models/backend/user';
import { types } from 'util';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  signIn$:Observable<any>= createEffect(()=>
  this.actions$.pipe(
      ofType(SignIn),
      map((action:any) => action.credentials),
      switchMap(credentials =>
          from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
              switchMap(signInState =>
                  this.afs.doc<User>(`users/${signInState?.user?.uid}`).valueChanges().pipe(
                      take(1),
                      tap(() => {
                          this.router.navigate(['/']);
                      }),
                      map(user => 
                          ({type:Types.SIGN_IN_EMAIL_SUCCESS,user:user ,uId:signInState?.user?.uid}))
                  )
              ),
              catchError(err => {
                  return of({type:Types.SIGN_IN_EMAIL_ERROR ,error: err});
              })
          )
      )

  )
);


  signUp$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUp),
      map((action) => action.credential),
      switchMap((credentials: EmailPasswordCredentials) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap(() => {
            this.afAuth.currentUser.then((currentUser) => {
              
              currentUser?.sendEmailVerification(
                environment.firebase.actionCodeSettings
              );
            });
            // this.router.navigate(['/auth/email-confirm']);
          })
        )
      ),
      // SignUpSuccess({uId:signUpState.user.uid}))
      map(
        (signUpState: any) => ({
          type: Types.SIGN_UP_EMAIL_SUCCESS,
          uId: signUpState.user.uid,
        }),

        catchError((err) => of({ type: Types.SIGN_UP_EMAIL_ERROR, error: err }))
      )
    )
  );


  signOut$:Observable<any>=createEffect(()=>
    this.actions$.pipe(
        ofType(SignOut),
        switchMap(() =>
            from(this.afAuth.signOut()).pipe(
                map(() =>({type:Types.SIGN_OUT_SUCCESS})),
                catchError(err => of({type:Types.SIGN_OUT_ERROR ,error:err}))
            )
        )
    )
  )

}
