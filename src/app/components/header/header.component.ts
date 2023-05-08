import { Component, OnInit ,Input ,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() IsAuthorized:boolean;
  @Output() SignOut:EventEmitter<any>= new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  signOut(){
    this.SignOut.emit();

  }

}
