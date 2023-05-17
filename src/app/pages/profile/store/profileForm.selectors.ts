import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./index";
import { ProfileFormData } from "./profileForm.model";

export const getProfileState = createFeatureSelector<ProfileState>('profile');

export const getFormState = createSelector(
    getProfileState,
    (state: ProfileState) =>state.form 
);

export const getPersonalForm = createSelector(
    getFormState,
    (state: ProfileFormData) =>state.personalData     //(!!state.personalData) ? : null
);

export const getProfessionalForm = createSelector(
    getFormState,
    (state: ProfileFormData) => (!!state.professionalData) ? state.professionalData :null
);