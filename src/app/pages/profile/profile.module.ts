import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { ProfessionalDataFormComponent } from './components/professional-data-form/professional-data-form.component';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { DisplayProfileDataComponent } from './pages/display-profile-data/display-profile-data.component';
import { StepperModule } from 'src/app/shared/components/stepper/stepper.module';
import { NotificationModule } from 'src/app/services/notification/notification.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'src/app/shared/components/file-upload/file-upload.module';
import { ControlsModule } from 'src/app/shared/components/controls/controls.module';
import { IndicatorsModule } from 'src/app/shared/components/indicators/indicators.module';
import { EmployeeComponent } from './components/professional-data-form/roles/employee/employee.component';
import { RecuiterComponent } from './components/professional-data-form/roles/recuiter/recuiter.component';
import { ExperiencesComponent } from './components/professional-data-form/roles/employee/experiences/experiences.component';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { UserResolver } from './resolvers/user.resolver';
import { MapperService } from './Services/mapper.service';


@NgModule({
  declarations: [
    PersonalDataFormComponent,
    ProfessionalDataFormComponent,
    ProfileFormComponent,
    DisplayProfileDataComponent,
    EmployeeComponent,
    RecuiterComponent,
    ExperiencesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StepperModule,
    NotificationModule,
    ReactiveFormsModule,
    FileUploadModule,
    ControlsModule,
    IndicatorsModule,

    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers:[UserResolver ,MapperService]
})
export class ProfileModule { }
