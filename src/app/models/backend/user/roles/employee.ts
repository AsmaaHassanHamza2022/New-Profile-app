export interface Employee {
    specialization: Specialization;
    skills: Skill[];
    qualification: Qualification;
    expectedSalary: number;
    experiences: Experience[];
}
export interface EmployeeForm {
    specialization: string;
    skills: string[];
    qualification: string;
    expectedSalary: number;
    experiences: Experience[];
}

interface Specialization {
    id: string;
    name: string;
    value?:string;
}

interface Skill {
    id: string;
    name: string;
    value?:string;
}

interface Qualification {
    id: string;
    name: string;
    value?:string;
}

export interface Experience {
    companyName: string;
    period: Period;
}

interface Period {
    from: number;
    to: number;
}

