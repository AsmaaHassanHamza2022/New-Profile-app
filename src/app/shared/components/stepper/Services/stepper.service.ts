import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}
@Injectable()
export class StepperService {
  public steps: Step[]=[];
  public activeSteps: ActiveStep;

  next = new Subject<boolean>();
    next$: Observable<boolean>;

    prev = new Subject<void>();
    prev$ = this.prev.asObservable();

    complete = new Subject<boolean>();
    complete$: Observable<boolean>;

    cancel = new Subject<void>();
    cancel$ = this.cancel.asObservable();

    check = new Subject<'next' | 'complete'>();
    check$ = this.check.asObservable();


  constructor() {

    this.next$ = this.next.asObservable().pipe(
      filter(isOk => isOk)
  );
  this.complete$ = this.complete.asObservable().pipe(
      filter(isOk => isOk)
  );
  }

  /**
   * init the stepper
   */
  init(stepperSteps: Step[]) {
    this.steps = stepperSteps;
    this.activeSteps = { ...stepperSteps[0], index: 0 };
  }

  /**
   * on click next
   */

  OnNext() {
    
    const index = this.activeSteps?.index + 1;
    if(index != this.steps.length){
      this.activeSteps = { ...this.steps[index], index: index };

    }
  }

  /**
   * on click previous
   */

  OnPrevious() {
    const index = this.activeSteps?.index - 1;
    if(index >=0){
      this.activeSteps = { ...this.steps[index], index: index };

    }
  }
}
