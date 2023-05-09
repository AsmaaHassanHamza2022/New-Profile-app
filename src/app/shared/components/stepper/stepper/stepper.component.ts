import { Component, OnInit } from '@angular/core';
import { StepperService } from '../Services/stepper.service';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  constructor(public stepperService: StepperService) {}

  ngOnInit(): void {}

  get steps() {
    return this.stepperService.steps;
  }

  get activeStep() {
    return this.stepperService.activeSteps;
  }

  isActive(index: number) {
    return index == this.activeStep.index;
  }

  isFirst(){
    return this.activeStep.index == 0;

  }

  isLast(){
    return this.activeStep.index== this.steps.length-1
  }

  nextStep(){
    this.stepperService.OnNext();
  }

  previousStep(){
    this.stepperService.OnPrevious();
  }
}
