import { Component, OnInit } from '@angular/core';
import { StepperService } from '../Services/stepper.service';

@Component({
  selector: 'stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  constructor(public stepperService: StepperService) {}

  ngOnInit(): void {
    this.stepperService.next$.subscribe(()=>{
      this.stepperService.OnNext();
    })


  }

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
    this.stepperService.check.next("next");
    // this.stepperService.OnNext();
  }

  previousStep(){
    this.stepperService.OnPrevious();
  }
  onCompelet(){
    this.stepperService.check.next("complete");
  }
}
