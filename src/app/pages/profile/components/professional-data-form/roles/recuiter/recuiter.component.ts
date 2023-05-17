import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Recruiter } from 'src/app/models/backend/user/roles';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';

@Component({
  selector: 'recuiter',
  templateUrl: './recuiter.component.html',
  styleUrls: ['./recuiter.component.scss']
})
export class RecuiterComponent implements OnInit ,OnDestroy {

  @Input() perantForm:FormGroup;
  @Input() dictionaries:Dictionaries;
  @Input() value:any;

  public recruiterDataForm:FormGroup;
  public regexErrors=regexErrors;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    
  }

  f(controlName:string){
    return this.recruiterDataForm.controls[controlName];
  }
  initForm(){
    this.recruiterDataForm=this.formBuilder.group({
      companyName:['' ,[Validators.required]],
      employeesCount:['',[Validators.required]]
    })

    if(this.value){
      this.recruiterDataForm.patchValue(this.value)
    }
    this.perantForm.addControl('role',this.recruiterDataForm)

  }

  ngOnDestroy(): void {
   this.perantForm.removeControl('role')
  }

}
