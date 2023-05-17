import { User } from "src/app/models/backend/user";

export interface EmailPasswordCredentials {
    email: string;
    password: string;
}

export type CreateNewUserData=Omit<User, 'uid' | 'email' | 'created'>;
