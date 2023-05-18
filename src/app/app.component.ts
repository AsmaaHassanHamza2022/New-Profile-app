import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Store, select } from '@ngrx/store';
import { Read } from './store/dictionaries/dictionaries.actions';
import { Init, SignOut,} from './store/users/users.actions';
import { Observable, filter, take } from 'rxjs';
import { getIsAuthorized, getUser, getUserState } from './store/users/users.selectors';
import { table } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthorized:Observable<any>;
  public user$:Observable<any>;

 

  constructor(private fs:AngularFirestore , private store:Store){
  }

  ngOnInit(): void {
     // get user data from 
    this.user$=this.store.pipe(select(getUser))
    this.store.dispatch(Init());

    this.store.pipe(select(getUserState),filter((state)=> !!state?.uid),take(1)).subscribe(()=>{
      this.store.dispatch(Read());

    })
    this.isAuthorized=this.store.select(getIsAuthorized);


    //#region 
    // const credential:EmailPasswordCredentials={
    //   email:'wojoto2069@jobbrett.com',
    //   password:'P@ssword'
      
      
    // }
    // this.store.dispatch(SignUp({credential:credential}))
    // this.fs.collection('test').snapshotChanges().subscribe((items)=>{
    //   console.log("res is " , items.map((item)=>item.payload.doc.data()))
    // })

    //#endregion
  }

  logout(){
    this.store.dispatch(SignOut());
  }
  
}
