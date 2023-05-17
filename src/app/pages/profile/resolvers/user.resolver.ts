import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, of, take } from 'rxjs';
import { User } from 'src/app/models/backend/user';
import { getUser } from 'src/app/store/users/users.selectors';

@Injectable()
export class UserResolver implements Resolve<boolean> {
  constructor(private store:Store){

  }
  resolve(): Observable<any> {
    return this.store.pipe(select(getUser),filter(user => !!user), take(1));
  }
}
