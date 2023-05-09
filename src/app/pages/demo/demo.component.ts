import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from 'src/app/models/frontend';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { markFormGroupTouched } from 'src/app/shared/utilities/forms';
import { regex } from 'src/app/shared/utilities/pattrens';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  public form:FormGroup;
  public regexErrors:any=regexErrors;

  public items:ControlItem[];
  constructor(private fb:FormBuilder) { }

  public today:Date=new Date();
  f(name:string):AbstractControl{
    return this.form.controls[name];
  }

  ngOnInit(): void {
    this.items = [
      { label: 'First', value: 1 },
      { label: 'Second', value: 2 },
      { label: 'Third', value: 3 },
      { label: 'Fourth', value: 4 },
      { label: 'Fifth', value: 5 }
  ];

  this.form=this.fb.group({
    name:["" ,[Validators.minLength(3),Validators.required ,Validators.pattern(regex.email)]],
    item:['',Validators.required],
    date:['',Validators.required],
    rangeDate:[''],
    checked:[[1,2],],
    radioes:[1,]

  })

  

  }

  markAsTouchded(){
    markFormGroupTouched(this.form)
  }

}
