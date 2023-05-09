import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  {
    path:'welcome',
    component:WelcomePageComponent
  },
  {
    path:'404',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
