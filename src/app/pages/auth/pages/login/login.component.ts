import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { regex } from 'src/app/shared/utilities/pattrens';
import { EmailPasswordCredentials } from 'src/app/store/users/users.model';
import * as fromUserActions from 'src/app/store/users/users.actions' ;
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from 'src/app/store/users/users.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public regexErrors:any=regexErrors;
  public loading$:Observable<any>;
 

  constructor(private formBuilder:FormBuilder ,private store:Store) { 
   
  }

  f(controlName:string){
    return this.loginForm.controls[controlName];
  }

  ngOnInit(): void {
    this.loading$=this.store.select(getLoading)
    this.initForm();
  }

  initForm(){
    this.loginForm=this.formBuilder.group({
     email:['',[Validators.required,Validators.pattern(regex.email)]],
     password:['',[Validators.required,Validators.pattern(regex.password)]],
    },)

  }

  login(){
    if(this.loginForm.valid){
      let userCredential:EmailPasswordCredentials={
        email:this.f('email')?.value,
        password:this.f('password')?.value
      }
      this.store.dispatch(fromUserActions.SignIn({credential:userCredential}))
    }
  }
}
