import { Component, OnInit ,Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NotifierService } from 'src/app/services/notification/notifier.service';
import { StepperService } from 'src/app/shared/components/stepper/Services/stepper.service';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { markFormGroupTouched } from 'src/app/shared/utilities/forms';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';
import { ProfessionalData } from '../../models/professionalData';

@Component({
  selector: 'professional-data-form',
  templateUrl: './professional-data-form.component.html',
  styleUrls: ['./professional-data-form.component.scss']
})
export class ProfessionalDataFormComponent implements OnInit ,OnDestroy {

  @Input() dictionaries:Dictionaries |null;
  @Input() value:ProfessionalData  | null;
  @Output() SendProfessionalData:EventEmitter<ProfessionalData> =new EventEmitter<ProfessionalData>();


  public professionalFormData:FormGroup;
  public regexErrors=regexErrors;
  public userType:'Recruiter' | 'Employee';
  public endSub$=new Subject()


  constructor(private formBuiler:FormBuilder ,private stepperService:StepperService ,private notifier:NotifierService) { }
  

  ngOnInit(): void {
    this.initForm();

    this.stepperService.check$.pipe(takeUntil(this.endSub$)).subscribe((type)=>{
     if(this.professionalFormData.invalid){
       markFormGroupTouched(this.professionalFormData);
      //  this.notifier.error("Please Full All Required Feilds ")
       this.stepperService[type].next(false);
     }else{
      this.SendProfessionalData.emit(this.professionalFormData.value);
       this.stepperService[type].next(true);
     }
   })

    
  }

  f(controlName:string){
    return this.professionalFormData.controls[controlName];
  }

  initForm(){
    this.professionalFormData=this.formBuiler.group({
      roleId:['' ,[Validators.required]],
      desc:['' ,[Validators.required]],
    })

    if(this.value){
      this.professionalFormData.patchValue(this.value)
    }
    
  }
  ngOnDestroy(): void {
    this.endSub$.next('');
    this.endSub$.complete();
  }

}
