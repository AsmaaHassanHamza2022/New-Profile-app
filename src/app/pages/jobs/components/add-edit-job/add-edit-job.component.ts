import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { CreateJob, updateJob } from '../../store/JobList/joblist.actions';
import { Job } from '../../store/JobList/joblist.model';
import { markFormGroupTouched } from 'src/app/shared/utilities/forms';
import { NotifierService } from 'src/app/services/notification/notifier.service';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.scss']
})
export class AddEditJobComponent implements OnInit {
  public jobForm:FormGroup;
  public regexErrors=regexErrors;

  constructor(private formBuilder:FormBuilder ,
    private store:Store , 
    private dialogRef: MatDialogRef<AddEditJobComponent>,
    @Inject(MAT_DIALOG_DATA) public formValue: { value: Job },
    private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.initForm();
  }

  public f(controlName:string){
    return this.jobForm.controls[controlName];
  }
  initForm(){
    this.jobForm=this.formBuilder.group({
      title:['',[Validators.required]],
      desc:['',[Validators.required]],
      salary:['',[Validators.required]]
    })
    if(this.formValue.value){
      this.jobForm.patchValue(this.formValue.value);
    }
  }

  onSubmit(){
    console.log(this.jobForm)

    if(this.jobForm.valid){
      if(this.formValue.value){
        const updatedJobData={...this.formValue.value ,...this.jobForm.value};
        this.store.dispatch(updateJob({updatedJob:updatedJobData}));
        this.notifierService.success("Job Updated successfully")
      }else{
        this.store.dispatch(CreateJob({newCreateJob:{...this.jobForm.value}}));
        this.notifierService.success("Job Added successfully")

      }
      this.dialogRef.close();
      
    }else{
      markFormGroupTouched(this.jobForm)
    }
  }

}


