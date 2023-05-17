import { Injectable } from '@angular/core';
import { User } from 'src/app/models/backend/user';
import { ProfileFormData } from '../store/profileForm.model';
import {
  Employee,
  EmployeeForm,
  Recruiter,
} from 'src/app/models/backend/user/roles';
import { Dictionaries } from 'src/app/store/dictionaries/dictionaries.model';
import { CreateNewUserData } from 'src/app/store/users/users.model';

@Injectable()
export class MapperService {
  constructor() {}

  userToForm(user: User): ProfileFormData {
    return {
      personalData: {
        name: user ? user.name : '',
        photoUrl: user ? user.photoURL : '',
        country: user ? user.country : '',
      },
      professionalData: {
        desc: user && user?.about ? user?.about : '',
        roleId: user ? user.roleId : '',
        role:this.getFormRole(user),
      },
    };
  }

  private getFormRole(user: User):EmployeeForm | Recruiter
  {  //EmployeeForm | Recruiter |null
   
    if (user.roleId === 'employee') {
      const role = user.role as Employee;

      const formRole = {
        expectedSalary: role.expectedSalary,
        specialization: role.specialization.value ?? '',
        qualification: role.qualification.value ?? '',
        skills: role.skills.map((x) => x.value?? ''),
        experiences: role.experiences,
      };
      return formRole;
    }else {
      const role = user.role as Recruiter;

      const formRole = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
      };
      return formRole;

    }
  }

  formToUserCreate(
    form:ProfileFormData,
    dictionaries: Dictionaries
  ): CreateNewUserData {
    return {
      name: form.personalData?.name || '',
      photoURL: form.personalData?.photoUrl || '',
      roleId: form.professionalData?.roleId || '',
      country: form.personalData?.country || '',
      about: form.professionalData?.desc,
      role: this.getRole(form, dictionaries),
    };
  }

  formToUserUpdate(
    form: ProfileFormData,
    user: User,
    dictionaries: Dictionaries
  ): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personalData?.name ||'',
      photoURL: form.personalData?.photoUrl || '',
      roleId: form.professionalData?.roleId || '',
      country: form.personalData?.country || '',
      about: form.professionalData?.desc ||'',
      role: this.getRole(form, dictionaries),
    };
  }

  private getRole(
    form: ProfileFormData,
    dictionaries: Dictionaries
  ):any  { //Employee | Recruiter
    debugger
    if (form.professionalData?.roleId === 'employee') {
      const formRole = form.professionalData.role as EmployeeForm;

      const role:any  = { //Employee
        expectedSalary: formRole.expectedSalary,
        specialization: dictionaries.specializations.items.find(
          (x) => x.value === formRole.specialization
        ),
        qualification: dictionaries.qualifications.items.find(
          (x) => x.value === formRole.qualification
        ),
        skills: formRole.skills.map((value) =>
          dictionaries.skills.items.find((x) => x.value === value)
        ),
        experiences: formRole.experiences,
      };

      return role;
    }

    if (form.professionalData?.roleId === 'recruiter') {
      const formRole = form.professionalData.role as Recruiter;

      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      };

      console.log("roleForm" ,role)
      return role;
    }
  }
}
