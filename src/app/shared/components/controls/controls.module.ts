import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputFieldComponent } from './input-field/input-field.component';



@NgModule({
  declarations: [
    InputComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[InputComponent ,InputFieldComponent]
})
export class ControlsModule { }
