import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../store/list/employeeList.model';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee:User;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ReadMore(userId:string){
   this.router.navigate(['/myProfile/'+userId]);
  }

}
