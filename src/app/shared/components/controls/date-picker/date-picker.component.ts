import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {InputComponent} from '../input/input.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type InputValue=number;
@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent extends InputComponent implements OnInit ,ControlValueAccessor{

  @Input() min:any;
  @Input() max:any;

    @Output() Datechanged = new EventEmitter<InputValue |null>();
    @Output() closed = new EventEmitter<void>();
  constructor() {
    super();
  }
  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
}
  onChanged(evt:MatDatepickerInputEvent<Date>){
    const value = evt.value ? evt.value.getTime() : null;

    this.value = value;
    this.propagateChange(value);
    this.Datechanged.emit(value);

  }
  onClosed(){
    this.propagateTouched();
    this.closed.emit();
  }
  

   override ngOnInit(): void {
  }

}
