import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';
import {
  ActiveStep,
  StepperService,
} from 'src/app/shared/components/stepper/Services/stepper.service';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';
import {
  getDictionaries,
  getLoading,
} from 'src/app/store/dictionaries/dictionaries.selectors';
import { ProfileFormData } from '../../store/profileForm.model';
import {
  clearProfileData,
  setProfileData,
  updateProfileData,
} from '../../store/profileForm.actions';
import { PersonalData } from '../../models/personalData';
import { ProfessionalData } from '../../models/professionalData';
import {
  getFormState,
  getPersonalForm,
  getProfessionalForm,
} from '../../store/profileForm.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/backend/user';
import { MapperService } from '../../Services/mapper.service';
import { createUser, updateUser } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  public dictionaries$: Observable<Dictionaries | null>;
  public loading$: any;
  public activeSteps: ActiveStep;
  public PersonalData$: Observable<PersonalData>;
  public professionalData$: Observable<ProfessionalData | null>;
  public profileData$: Observable<ProfileFormData | null>;
  public user: User;
  public isEditing: boolean = false;
  public destroy$ = new Subject();

  constructor(
    public stepperService: StepperService,
    private router: Router,
    private mapper: MapperService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.isEditing = !!this.user;

    // catch all data
    this.dictionaries$ = this.store.select(getDictionaries);
    this.loading$ = this.store.select(getLoading);
    this.profileData$ = this.store.select(getFormState);

    this.PersonalData$ = this.store.select(getPersonalForm);
    this.professionalData$ = this.store.select(getProfessionalForm);

    const profileFormSteps = [
      {
        key: '1',
        label: 'Personal',
      },
      {
        key: '2',
        label: 'Professional',
      },
    ];
    this.stepperService.init(profileFormSteps);
    this.activeSteps = this.stepperService.activeSteps;

    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(setProfileData({ profileData: form }));
    }

    this.stepperService.complete$
      .pipe(
        switchMap(() => zip(this.profileData$, this.dictionaries$)),
        takeUntil(this.destroy$)
      )
      .subscribe(([profile, dictionaries]) => {
        if (profile?.personalData.name && profile?.professionalData.roleId)
          this.onComplete(profile, this.user, dictionaries);
      });

    
    this.stepperService.cancel$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate(['/profile', this.user.uid]);
    });
  }

  get PageTitle() :string{
    if( this.isEditing ){
      return  "Edit Profile"
    }else{
      return "New Profile" ;
    }

  }
  getPersonalData(personalData: PersonalData) {
    this.store.dispatch(
      updateProfileData({ change: { personalData: personalData } })
    );
  }

  getProfessionalData(professionalData: ProfessionalData) {
    this.store.dispatch(
      updateProfileData({ change: { professionalData: professionalData } })
    );
  }

  private onComplete(profile: any, user: User, dictionaries: any): void {
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(updateUser({ user: request }));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(createUser({ newUserData: request }));
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
    this.store.dispatch(clearProfileData());
  }
}
