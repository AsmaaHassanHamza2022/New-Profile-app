import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import {MatSelectModule} from '@angular/material/select';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputComponent,
    InputFieldComponent,
    InputPasswordComponent,
    SelectBoxComponent,
    DatePickerComponent,
    DatePickerRangeComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  exports:
  [InputComponent ,
    InputFieldComponent ,
    InputPasswordComponent ,
    SelectBoxComponent ,
    MatSelectModule,
    DatePickerComponent,
    DatePickerRangeComponent]
})
export class ControlsModule { }
