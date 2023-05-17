import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './pages/profile-form/profile-form.component';
import { UserResolver } from './resolvers/user.resolver';
import { DisplayProfileDataComponent } from './pages/display-profile-data/display-profile-data.component';

const routes: Routes = [
  {path:'new' ,component:ProfileFormComponent},
  {path:'edit' ,component:ProfileFormComponent ,
  resolve:{user:UserResolver}},
  {path:'show' ,component:ProfileFormComponent},
  {path:':id' ,component:DisplayProfileDataComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    
    ],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
