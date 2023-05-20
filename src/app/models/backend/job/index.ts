import {} from 'firebase/app';
export interface Job{
    title:string,
    salary:string,
    desc:string;
    created:any
    updated?:any
}