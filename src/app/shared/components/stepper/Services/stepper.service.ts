import { Injectable } from '@angular/core';
export interface Step {
  key: string;
  label: string;
}

export interface ActiveStep extends Step {
  index: number;
}
@Injectable()
export class StepperService {
  public steps: Step[]=[
    {
      key:"1",
     label:'First Step'
    },
    {
      key:'2',
     label:'second Step'
    },
    {
      key:'3',
     label:'third Step'
    }
  ];
  public activeSteps: ActiveStep= {
    key:"1",
   label:'First Step',
   index:0
  };

  constructor() {}

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
    this.activeSteps = { ...this.steps[index], index: index };
  }

  /**
   * on click previous
   */

  OnPrevious() {
    const index = this.activeSteps?.index - 1;
    this.activeSteps = { ...this.steps[index], index: index };
  }
}
