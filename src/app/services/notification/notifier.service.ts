import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomNotificationComponent } from './components/custom-notification/custom-notification.component';

@Injectable()
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  error(message: string): void {
    this.snackBar.openFromComponent(CustomNotificationComponent, {
        duration: 3000,
        data: { message },
        horizontalPosition:'left',
        verticalPosition:'bottom',
        panelClass: ['mat-snackbar_error']
    });
}

success(message: string): void {
    this.snackBar.openFromComponent(CustomNotificationComponent, {
        duration: 3000,
        data: { message },
        horizontalPosition:'left',
        verticalPosition:'bottom',
        panelClass: ['mat-snackbar_success']
    });
}
}
