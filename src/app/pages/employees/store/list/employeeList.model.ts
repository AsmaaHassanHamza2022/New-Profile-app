import { User  as DBUser} from "src/app/models/backend/user";
import { Employee } from "src/app/models/backend/user/roles";


export interface User extends DBUser {
    role: Employee;
}
