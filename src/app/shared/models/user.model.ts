import { Observable } from 'rxjs/Observable';

export class User {
    _id: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    document: string;
    enrolment: string;
    accessProfile: string;
    oauth: string;
    registerDate: Date;
    isFullRegister: boolean;
    status: boolean;
    __v: number;
}
