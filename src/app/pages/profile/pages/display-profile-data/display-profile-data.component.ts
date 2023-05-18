import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ReadUserProfile } from '../../store/user/user.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { getLoading, getUser as userProfile} from '../../store/user/user.selector';
import { User } from 'src/app/models/backend/user';
import { getUser } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-display-profile-data',
  templateUrl: './display-profile-data.component.html',
  styleUrls: ['./display-profile-data.component.scss']
})
export class DisplayProfileDataComponent implements OnInit {

  public profileData:any={} as any;
  public loading$:Observable<boolean>;
  public isOwnProfile$:Observable<boolean |null>;

  constructor(private store:Store ,private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let userId= this.route.snapshot.paramMap.get('id');
     this.store.pipe(select(userProfile)).subscribe((user:User)=>{
      this.profileData=user
     });
     
     this.loading$=this.store.select(getLoading)

     this.isOwnProfile$=this.store.pipe(select(getUser),map((user)=>user && user.uid == userId))

 
    if(userId){
      this.store.dispatch(ReadUserProfile({userId:userId}))
    }

  }

}
