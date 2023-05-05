import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Store } from '@ngrx/store';
import { Read } from './store/dictionaries/dictionaries.actions';
import { SignUp } from './store/users/users.actions';
import { EmailPasswordCredentials } from './store/users/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fs:AngularFirestore , private store:Store){

  }

  ngOnInit(): void {
    this.store.dispatch(Read())
    const credential:EmailPasswordCredentials={
      email:'wojoto2069@jobbrett.com',
      password:'P@ssword'
      
      
    }
    this.store.dispatch(SignUp({credential:credential}))
    // this.fs.collection('test').snapshotChanges().subscribe((items)=>{
    //   console.log("res is " , items.map((item)=>item.payload.doc.data()))
    // })

    
  }
  
}
