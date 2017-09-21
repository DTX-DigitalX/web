import { Observable } from 'rxjs/Observable';

export class Auth {
    _id: Observable<string>
    username: Observable<string>
    password: Observable<string>
    token: Observable<string>
}