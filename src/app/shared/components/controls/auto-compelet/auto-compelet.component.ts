import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs';
import { ControlItem, Value } from 'src/app/models/frontend';
import { InputComponent } from '../input/input.component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'auto-compelet',
  templateUrl: './auto-compelet.component.html',
  styleUrls: ['./auto-compelet.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutoCompeletComponent),
        multi: true
    }
]
})
export class AutoCompeletComponent extends InputComponent implements OnInit {
    @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) search: MatAutocompleteTrigger;

  @Input() items: ControlItem[];
  @Input() override placeholder: string;

  @Output() override changed = new EventEmitter<Value>();

  formControl = new FormControl();
  options$: Observable<ControlItem[]>;

  private destroy = new Subject<any>();

  constructor() { super() }

  override ngOnInit(): void {
      this.options$ = this.formControl.valueChanges.pipe(
          startWith(''),
          filter(value => typeof value === 'string' || typeof value === 'object'),
          map(value => typeof value === 'string' ? value : value.label),
          map(label => label ? this.filter(label) : this.items?.slice())
      );

      this.formControl.valueChanges.pipe(
          takeUntil(this.destroy),
          distinctUntilChanged()
      ).subscribe(item => {
          const value = typeof item === 'object' ? item?.value : null;
          this.propagateChange(value);
          this.changed.emit(value);
      });
  }

  ngOnDestroy(): void {
      this.destroy.next('');
      this.destroy.complete();
  }

  private filter(value: string): ControlItem[] {
      const filterValue = value.toLowerCase();
      return this.items?.filter(item => item.label.toLowerCase().includes(filterValue));
  }

  openPanel(evt:Event): void {
    evt.stopPropagation();
    this.search.openPanel();
  }

  override writeValue(value: Value): void {
      const selectedOption = this.items?.find(item => item.value === value);
      this.formControl.setValue(selectedOption);
  }


  override setDisabledState(isDisabled: boolean): void {
      if (isDisabled) {
          this.formControl.disable();
      } else {
          this.formControl.enable();
      }
  }

  displayFn(item?: ControlItem): string  {
      return item ? item.label : '';
  }

  

}
