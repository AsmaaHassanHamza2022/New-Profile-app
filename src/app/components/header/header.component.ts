import { Component, OnInit ,Input ,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/backend/user';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() IsAuthorized:boolean;
  @Input() user:User;
  @Output() SignOut:EventEmitter<any>= new EventEmitter<any>();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  signOut(){
    this.SignOut.emit();

  }

  onProfileNavigate(): void {
    const path = this.user ? this.user.uid : 'new';
    this.router.navigate(['/myProfile', path]);
}

}
