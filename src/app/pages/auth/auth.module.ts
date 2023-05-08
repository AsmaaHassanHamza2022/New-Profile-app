import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ConfirmationEmailComponent } from './pages/confirmation-email/confirmation-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from 'src/app/shared/components/controls/controls.module';
import { IndicatorsModule } from 'src/app/shared/components/indicators/indicators.module';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ConfirmationEmailComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ControlsModule,
    IndicatorsModule
  ]
})
export class AuthModule { }
