import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { ButtonsModule } from 'src/app/shared/components/buttons/buttons.module';
import { ControlsModule } from 'src/app/shared/components/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    ButtonsModule,
    ControlsModule,
    ReactiveFormsModule
  ],
  exports:[
    DemoComponent
  ]
})
export class DemoModule { }
