import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ConfirmationEmailComponent } from './pages/confirmation-email/confirmation-email.component';

const routes: Routes = [
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegistrationComponent},
  {path:'confirm-registration' ,component:ConfirmationEmailComponent},
  {path :'**' ,component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
