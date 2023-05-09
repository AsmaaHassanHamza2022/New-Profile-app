import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';
import { NotifierService } from './notifier.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CustomNotificationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ]
})
export class NotificationModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
        ngModule: NotificationModule,
        providers: [
          NotifierService
        ]
    }
  

}
 }
