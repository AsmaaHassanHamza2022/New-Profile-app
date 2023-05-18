import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ReadEmployeesList } from '../store/list/employeeList.actions';
import { ListState } from '../store/list/employeeList.reducers';
import { Observable } from 'rxjs';
import { getItems } from '../store/list/employeeList.selects';
import { User } from '../store/list/employeeList.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  public employeesList$:Observable<User[]>
  constructor(private store:Store) { }

  ngOnInit(): void {

    this.employeesList$ =this.store.pipe(select(getItems));

    this.store.dispatch(ReadEmployeesList())

  }

}
