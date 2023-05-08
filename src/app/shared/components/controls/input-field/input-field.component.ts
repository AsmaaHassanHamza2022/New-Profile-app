import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit  {

  @Input() controlName:string='';
  @Input() isRequired:boolean=false;
  @Input() control:AbstractControl;
  @Input() patternError:string;
  public validationMessage:string='';

 
  constructor() { }

  ngOnInit(): void {
  }

  get errorKey(){
    return this.control && this.control.errors && Object.keys(this.control.errors)[0] 
  }

  hasError(){
    return this.control && this.control.invalid && this.control.touched
  }


}
