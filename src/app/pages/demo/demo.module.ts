import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { ButtonsModule } from 'src/app/shared/components/buttons/buttons.module';
import { ControlsModule } from 'src/app/shared/components/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IndicatorsModule } from 'src/app/shared/components/indicators/indicators.module';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { StepperModule } from 'src/app/shared/components/stepper/stepper.module';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    ButtonsModule,
    ControlsModule,
    IndicatorsModule,
    ReactiveFormsModule,
    FileUploadModule,
    StepperModule
  ],
  exports:[
    DemoComponent
  ]
})
export class DemoModule { }
