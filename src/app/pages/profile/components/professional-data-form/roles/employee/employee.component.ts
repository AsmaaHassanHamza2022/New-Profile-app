import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Value } from 'src/app/models/frontend';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit ,OnDestroy {

  @Input() perantForm:FormGroup;
  @Input() dictionaries:Dictionaries |null;
  @Input() value:any;


  public employeeForm:FormGroup;


  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  f(controlName:string){
    return this.employeeForm.controls[controlName]
  }

  initForm(){
    this.employeeForm=this.formBuilder.group({
      specialization:['',[Validators.required]],
      skills:[[],[Validators.required]],
      qualification:['',[Validators.required]],
      expectedSalary:['',[Validators.required]]
    })

    if(this.value){
      this.employeeForm.patchValue(this.value)
    }

    this.perantForm.addControl("role", this.employeeForm)
  }

  catchSelectedSkills(skillsList:Value[] ){
    this.f('skills').setValue([...skillsList]);

  }
  ngOnDestroy(): void {
    this.perantForm.removeControl("role")
  }

}
