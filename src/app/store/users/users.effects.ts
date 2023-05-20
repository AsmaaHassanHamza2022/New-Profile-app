import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  Init,
  SignIn,
  SignOut,
  Types,
  createUser,
  createUserSuccess,
  updateUser,
} from './users.actions';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EmailPasswordCredentials } from './users.model';
import { environment } from 'src/environments/environment';
import { SignUp } from './users.actions';
import { User } from 'src/app/models/backend/user';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NotifierService } from 'src/app/services/notification/notifier.service';

@Injectable()
export class UserEffects {
  public authUserData: any;
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notificationService:NotifierService
  ) {}

  init$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(Init),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((authState) => {
        if (authState) {
          return this.afs
            .doc<User>(`users/${authState.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((user) => ({
                type: Types.INIT_AUTHORIZED,
                user: user,
                uId: authState.uid,
              })),
              catchError((err) =>
                of({ type: Types.INIT_ERROR, error: err.message })
              )
            );
        } else {
          return of({ type: Types.INIT_UNAUTHORIZED });
        }
      })
    )
  );

  signIn$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(SignIn),
      map((action: any) => {
        return action.credential;
      }),
      switchMap((credentials) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap((signInState) => console.log('After login ', signInState)),
          switchMap((signInState) =>
            this.afs
              .doc<User>(`users/${signInState?.user?.uid}`)
              .valueChanges()
              .pipe(
                take(1),
                tap(() => {
                  this.router.navigate(['/']);
                }),
                map((user) => ({
                  type: Types.SIGN_IN_EMAIL_SUCCESS,
                  user: user,
                  uId: signInState?.user?.uid,
                }))
              )
          ),
          catchError((err) => {
            debugger
            this.notificationService.error("Enter Valid Email and Password , If You new user please sign up")
            return of({ type: Types.SIGN_IN_EMAIL_ERROR, error: err });
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
            // this.afAuth.currentUser.then((currentUser) => {
            //   currentUser?.sendEmailVerification(
            //     environment.firebase.actionCodeSettings
            //   );
            // });
            this.router.navigate(['/']);  //auth/confirm-registration
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

  signOut$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(SignOut),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          tap(() => this.router.navigate(['/auth/login'])),
          map(() => ({ type: Types.SIGN_OUT_SUCCESS })),
          catchError((err) => {
            return of({ type: Types.SIGN_OUT_ERROR, error: err })
          })
        )
      )
    )
  );

  createUser$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      map((action) => action.newUserData),
      tap((user) => {
        const auth = getAuth();
        this.authUserData = auth.currentUser;
        console.log('current user ' +user + ":", this.authUserData);
        // onAuthStateChanged(auth, (user) => {
        //   if (user) this.authUserData=user;
        // console.log("current user from event " ,this.authUserData)

        // });
      }),
      // withLatestFrom(this.afAuth.authState.pipe(take(1))),
      // tap(([user,state])=>{
      //   debugger
      //   console.log("user data is" ,user),
      //   console.log("state data is" ,state)
      // }),
      map((user) => ({
        ...user,
        uid: this.authUserData?.uid || '',
        email: this.authUserData?.email || '',
        created: new Date().toUTCString(),
      })),
      switchMap((user: User) =>
        from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
          tap(()=>this.router.navigate([`/myProfile/${user.uid}`])),
          map(() => ({ type: Types.CREATE_USER_SUCCESS, user: user })),
          catchError((error) =>
            of({ type: Types.CREATE_USER_ERROR, error: error })
          )
        )
      )
    )
  );

  updateUser$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      map((action) => action.user),
      switchMap((user: User) =>
        from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
          tap(()=>this.router.navigate([`/myProfile/${user.uid}`])),
          map(() => ({ type: Types.UPDATE_USER_SUCCESS, user: user })),
          catchError((error) =>
            of({ type: Types.UPDATE_USER_ERROR, error: error })
          )
        )
      )
    )
  );
}



