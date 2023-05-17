import { createReducer, on } from "@ngrx/store";
import { ProfileFormData } from "./profileForm.model" ;
import * as profileActions  from './profileForm.actions';
import { PersonalData } from "../models/personalData";
import { ProfessionalData } from "../models/professionalData";

export const ProfileFormDataInit:ProfileFormData={
    personalData:{}     as PersonalData,
    professionalData:{} as ProfessionalData
}

export const  userReducers =createReducer(ProfileFormDataInit,
    on(profileActions.setProfileData,(state,{profileData})=>({...state,...profileData })),
    on(profileActions.updateProfileData,(state,{change})=>({...state,...change })),
    on(profileActions.clearProfileData,(state)=>({...ProfileFormDataInit})),
    )