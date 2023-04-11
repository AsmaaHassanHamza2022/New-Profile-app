import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';

 type InputType= 'password' | 'text' ;
@Component({
  selector: 'input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
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
