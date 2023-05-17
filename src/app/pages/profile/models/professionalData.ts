import { EmployeeForm} from "src/app/models/backend/user/roles/employee";
import { Recruiter } from "src/app/models/backend/user/roles/recruiter";

export interface ProfessionalData{
    roleId:string;
    desc:string;
    role:EmployeeForm | Recruiter
}



