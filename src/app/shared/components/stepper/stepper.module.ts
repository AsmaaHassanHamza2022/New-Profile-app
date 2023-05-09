import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { StepperService } from './Services/stepper.service';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StepperComponent,
  ],
  providers:[StepperService]
})
export class StepperModule { }
