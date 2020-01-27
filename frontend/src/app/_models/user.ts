export class User {
    _id: string;
    userId: number;
    username: string;
    mobileNumber: string;
    firstName: string;
    lastName: string;
    assignRole: string;
    email: string;
    user_id:string;
    address: string;
    city: string;
    state:string;
    zip: string;
    description:string;
    active:boolean;
    token?: string;
    image: string;
    role:string;
    phonenumber:number; 
}

export enum UserRegistrationStatus {
    SUCCESS = 1,
    FAILED = 2,
    DUPLICATEUSER = 3,
    ALREADYSENDMEMBERSHIPREQUEST = 4,
    

}