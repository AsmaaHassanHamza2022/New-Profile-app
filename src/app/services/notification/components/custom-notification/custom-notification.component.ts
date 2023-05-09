import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
export interface Notification{
  message:string

}
@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss']
})
export class CustomNotificationComponent implements OnInit {

  public message:string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) { 
    this.message=data.message;
  }

  ngOnInit(): void {
  }

}
