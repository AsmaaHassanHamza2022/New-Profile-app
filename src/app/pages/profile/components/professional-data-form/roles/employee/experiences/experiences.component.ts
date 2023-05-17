import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from 'src/app/models/backend/user/roles';

@Component({
  selector: 'experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit ,OnDestroy {

  @Input() parentForm:FormGroup;
  @Input() value:Experience[];

  public employeeExperiencesForm:FormArray;
  
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.value ? this.value =this.value :this.value =[];
    this.initFrom();
  }

  initFrom(){
    this.employeeExperiencesForm=this.formBuilder.array(this.getFormGroupArray(this.value));
    this.parentForm.addControl('experiences',this.employeeExperiencesForm)
  }
  get experiences(){
    return (this.parentForm.controls['experiences'] as FormArray).controls as FormGroup[]
    
  }

  getFormGroupArray(values:Experience[]){
    if(values && !values.length){
      return [this.getFormGroup()];
    }else{
      return values.map((value)=>this.getFormGroup(value));
    }

  }

  private getFormGroup(value?:Experience){

    const group=this.formBuilder.group({
      companyName:['',[Validators.required]],
      period:['',[Validators.required]]
    })

    if(value){
      group.patchValue(value)
    }

    return group;
  }

  addNewExperince(){
    this.employeeExperiencesForm.push(this.getFormGroup());
  }

  deleteExperience(index:number){
    this.employeeExperiencesForm.removeAt(index);
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl("experiences")
  }
}
