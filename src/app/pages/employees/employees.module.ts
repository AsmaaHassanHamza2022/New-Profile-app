import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeCardComponent } from './component/employee-card/employee-card.component';
import { IndicatorsModule } from 'src/app/shared/components/indicators/indicators.module';


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    IndicatorsModule,
    StoreModule.forFeature('employeesList', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class EmployeesModule { }
