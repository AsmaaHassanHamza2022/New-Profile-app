import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';
import { AddEditJobComponent } from './components/add-edit-job/add-edit-job.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from 'src/app/shared/components/controls/controls.module';
import { MatDialogModule } from '@angular/material/dialog';
import { IndicatorsModule } from 'src/app/shared/components/indicators/indicators.module';


@NgModule({
  declarations: [
    JobListComponent,
    AddEditJobComponent,
    JobItemComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    ControlsModule,
    MatDialogModule,
    StoreModule.forFeature('jobs', reducers),
    EffectsModule.forFeature(effects),
    IndicatorsModule
  ]
})
export class JobsModule { }
