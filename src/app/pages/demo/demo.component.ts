import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { regex } from 'src/app/shared/utilities/pattrens';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public form:FormGroup;
  public regexErrors:any=regexErrors;

  constructor(private fb:FormBuilder) { }

  f(name:string):AbstractControl{
    return this.form.controls['name'];
  }

  ngOnInit(): void {
  this.form=this.fb.group({
    name:["asmaa" ,[Validators.minLength(3),Validators.required ,Validators.pattern(regex.email)]]
  })

  }

}
