import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { NotifierService } from 'src/app/services/notification/notifier.service';
import { StepperService } from 'src/app/shared/components/stepper/Services/stepper.service';
import { regexErrors } from 'src/app/shared/utilities/formValidationError';
import { regex } from 'src/app/shared/utilities/pattrens';
import { PersonalData } from '../../models/personalData';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';
import { markFormGroupTouched } from 'src/app/shared/utilities/forms';



@Component({
  selector: 'personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent implements OnInit ,OnDestroy{

  @Input() dictionaries:Dictionaries|null;
  @Input() value:PersonalData |null;
  @Output() SendPersonalData:EventEmitter<PersonalData> =new EventEmitter<PersonalData>();

  public profilePhotoUrl:SafeStyle;
  public endSub$= new Subject();
  public personalDataForm:FormGroup;
  public regexErrors:any=regexErrors;
  constructor(
    private stepperService:StepperService ,
    private notifier:NotifierService ,
    public sanitizer:DomSanitizer,
    private formBuilder:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.stepperService.check$.subscribe((type)=>{
      if(this.personalDataForm.invalid){
        markFormGroupTouched(this.personalDataForm);
        this.notifier.error("Please Full All Required Feilds ")
        this.stepperService[type].next(false);

      }else{
        console.log(this.personalDataForm)
        this.stepperService[type].next(true);
        this.SendPersonalData.emit(this.personalDataForm.value)
      }
    })
  }
  getUploadedImgUrl(photoUrl:any){
    this.f('photoUrl').setValue(photoUrl);
    this.changeProfilePhotoUrl(photoUrl);

  }

  changeProfilePhotoUrl(url:string){
    url ? this.profilePhotoUrl= this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`):null;

  }
  public f(countrolName:string){
    return this.personalDataForm.controls[countrolName]
  }

  private initForm(){
    this.personalDataForm=this.formBuilder.group({
      photoUrl:[''],
      name:['' ,[Validators.required ,Validators.pattern(regex.letterAndSpaces)]],
      country:['' ,[Validators.required]]
    })

    if(this.value){
      this.personalDataForm.patchValue(this.value);
     this.changeProfilePhotoUrl(this.value.photoUrl);

    }

  }

  ngOnDestroy(): void {
    this.endSub$.next("");
    this.endSub$.complete();
    
  }

}
