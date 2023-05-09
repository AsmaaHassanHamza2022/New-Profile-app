import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from 'src/app/models/frontend';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting:forwardRef(() => CheckBoxComponent),
      multi: true,
    },
  ],
})
export class CheckBoxComponent extends InputComponent implements OnInit {

  @Input() items:ControlItem[];
  @Output() override changed: EventEmitter<Value[]|null>;
  public override value:Value[] |null=[];

  constructor() {
    super();
  }

  override writeValue(value: Value[]): void {
    this.value=value;
      
  }

  onChanged(value:Value ,evt:Event){
    const selected=this.getSelected(value,evt);

    this.value=selected;
    this.propagateChange(selected);
    this.changed.emit(selected);



  }

  private getSelected(value:Value ,evt:Event){
    const selected:Value[]=this.value ?[...this.value] :[];
    const isChecked=(evt.target as HTMLInputElement).checked;
    
    if(isChecked){
      if(!selected.includes(value)){
        selected.push(value);
      }
    }else{
      const index=selected.indexOf(value);
      selected.splice(index,1);
    }
    
    return selected.length ? selected  : null;

  }

  isChecked(value: Value): boolean | null {
    return this.value && this.value.includes(value);
}
  
}
