import { Component, OnInit, forwardRef } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

 type InputType= 'password' | 'text' ;
@Component({
  selector: 'input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => InputPasswordComponent),
      multi: true,
    },
  ],
})
export class InputPasswordComponent extends InputComponent  implements OnInit {

  public inputType:InputType='password';
  constructor() { 
    super();
  }

  override ngOnInit(): void {
  }

  public toggle(){
    if(this.inputType ==='password'){
      this.inputType='text';
    }else{
      this.inputType='password';
    }
     
  }

}
