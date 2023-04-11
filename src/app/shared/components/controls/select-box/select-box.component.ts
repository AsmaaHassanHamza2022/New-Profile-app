import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ControlItem, Value } from 'src/app/models/frontend/control-item';
import { MatSelectChange } from '@angular/material/select';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent extends InputComponent implements OnInit {
  @Input() items: ControlItem[];
  public override value: Value;
  constructor() {
    super();
   }

  override ngOnInit(): void {
   
  }

  override onKeyup(data: any): void {
      
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
}
  
  
}
