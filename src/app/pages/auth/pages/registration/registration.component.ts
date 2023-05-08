import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { regex } from 'src/app/shared/utilities/pattrens';
import * as fromUserActions from 'src/app/store/users/users.actions' ;
import { EmailPasswordCredentials } from 'src/app/store/users/users.model';
import { getLoading } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm:FormGroup;
  public regexErrors:any=regexErrors;
  public loading$:Observable<any>;
 

  constructor(private formBuilder:FormBuilder ,private store:Store ) { 
   
  }

  f(controlName:string){
    return this.registrationForm.controls[controlName];
  }

  ngOnInit(): void {
    this.loading$=this.store.select(getLoading)
    this.initForm();
  }

  initForm(){
    this.registrationForm=this.formBuilder.group({
     email:['',[Validators.required,Validators.pattern(regex.email)]],
     password:['',[Validators.required,Validators.pattern(regex.password)]],
     repeatePassword:['',[Validators.required,Validators.pattern(regex.password)]],
    },{
      validator: this.repeatPasswordValidator
    })
  }

  
  private repeatPasswordValidator(group: FormGroup): { [key: string]: boolean } |null {
    const password = group.get('password')!;
    const passwordRepeat = group.get('repeatePassword')!;

    return passwordRepeat.value && password.value !== passwordRepeat.value
        ? { repeat: true }
        : null;
}

  register(){

    if(this.registrationForm.valid){
      let userCredential:EmailPasswordCredentials={
        email:this.f('email')?.value,
        password:this.f('password')?.value
      }
      this.store.dispatch(fromUserActions.SignUp({credential:userCredential}))
    }
    //Todo ===need snake to 
  }

}
