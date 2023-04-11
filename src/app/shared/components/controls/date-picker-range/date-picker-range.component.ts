import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '../input/input.component';
export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: string;
  to: string;
}


@Component({
  selector: 'date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerRangeComponent),
        multi: true
    }
]
})
export class DatePickerRangeComponent extends InputComponent implements OnInit {

  @Input()  dateRangePlaceholder: Placeholder;
  @Output() override changed = new EventEmitter<Value>();
  public form:FormGroup;

  constructor(private fb: FormBuilder) {
    super();
   }

  override ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null],
  });
  }


 

  get min(): Date |null {
      const from = this.form.controls['from'].value;
      return from ? new Date(from) : null;
  }

  get max(): Date |null {
      const to = this.form.controls['to'].value;
      return to ? new Date(to) : null;
  }

  

  override writeValue(value: Value): void {
      this.form.patchValue(value || {});
  }

  

  override setDisabledState(isDisabled: boolean): void {
      if (isDisabled) {
          this.form.disable();
      } else {
          this.form.enable();
      }
  }

  onChanged(): void {
      const value = { ...this.form.value };
      this.propagateChange(value);
      this.changed.emit(value);
  }

  onClosed(): void {
      this.propagateTouched();
  }


}
