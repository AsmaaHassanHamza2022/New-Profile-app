import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeCardComponent } from './component/employee-card/employee-card.component';


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,

    StoreModule.forFeature('employeesList', reducers),
    EffectsModule.forFeature(effects),
  ]
})
export class EmployeesModule { }
