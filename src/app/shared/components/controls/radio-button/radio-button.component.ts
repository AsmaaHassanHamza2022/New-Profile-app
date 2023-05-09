import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ControlItem, Value } from 'src/app/models/frontend';

@Component({
  selector: 'radio',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioButtonComponent),
        multi: true
    }
]
})
export class RadioButtonComponent extends InputComponent implements OnInit {

  @Input() items:ControlItem[];

  constructor() {

    super();
   }
  

   onChanged(value: Value): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
}

isChecked(value: Value): boolean {
    return this.value === value;
}


}
