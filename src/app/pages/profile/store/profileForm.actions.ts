import { createAction, props } from "@ngrx/store";
import { ProfileFormData } from "./profileForm.model";
import { PersonalData } from "../models/personalData";
import { ProfessionalData } from "../models/professionalData";


export enum Types{
    SET = '[Profile] [Form] Set',
    UPDATE = '[Profile] [Form] Update',
    CLEAR = '[Profile] [Form] Clear'

}

export const  setProfileData =createAction(Types.SET,props<{profileData:ProfileFormData}>())
export const  updateProfileData =createAction(Types.UPDATE,props<{change:Partial<ProfileFormData>}>())
export const  clearProfileData =createAction(Types.CLEAR)