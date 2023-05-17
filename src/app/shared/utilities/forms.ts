import {FormGroup } from "@angular/forms";

export const markFormGroupTouched = (formGroup:FormGroup) => {
    Object.values(formGroup.controls).forEach((control:any) => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};
