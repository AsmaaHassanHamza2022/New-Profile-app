import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Value } from 'src/app/models/frontend';

@Component({
  selector: 'custom-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  public value: any='';
  public isDisabled:boolean=false;

  @Input() placeholder: string='';
  @Input() hasError:boolean=false;
  @Output() changed = new EventEmitter<Value|any>();

  constructor() {}
  ngOnInit(): void {}

  public propagateChange: any = () => { };
  public propagateTouched: any = () => { };

  writeValue(value: string|any): void {
      this.value = value;
  }

  registerOnChange(fn: any): void {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
      this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
  }

  onKeyup(data: any): void {
      this.value = data?.value;
      this.propagateChange(this.value);
      this.changed.emit(this.value);
  }

  onBlur(): void {
      this.propagateTouched();
  }
}
