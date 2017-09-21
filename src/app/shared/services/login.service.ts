import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  showMenuAndSide = new EventEmitter<boolean>();

  isLoggedIn: boolean;
  credential: any;
  token: any;
  OnLoggout = new EventEmitter<any>();

  constructor(private http: Http, private router: Router) {
    this.isLoggedIn = false;
    this.token = JSON.parse(localStorage.getItem('token'));

    if (this.token)
      this.isLoggedIn = true;
  }

  ngOnInit() {

  }

  user(login: string) {
    this.isLoggedIn = false;
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: header });

    let endpoint = '/validateUserEmail/' + login
    let url = environment.URL_BASE + endpoint;

    return this.http.get(url, options)
      .map((response: Response) => {
        //localStorage.setItem('token', JSON.stringify(response.json()));
        this.credential = response.json();
        return this.credential;
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'))
      .toPromise();
  }

  login(email: string, password: string) {
    this.isLoggedIn = false;
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: header });

    let body = 'grant_type=password&username=' + email + '&password=' + password + '&client_id=' + environment.CLIENT_ID + '&client_secret=' + environment.CLIENT_SECRET;
    let url = environment.URL_TOKEN;
    return this.http.post(url, body, options)
      .map((response: Response) => {
        localStorage.setItem('token', JSON.stringify(response.json()));
        this.isLoggedIn = true;
        this.token = response.json();
        // TODO: BUG
        //this.showMenuAndSide.emit(true);

        return this.token;
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'))
      .toPromise();
  }

  iniciar() {
    this.showMenuAndSide.emit(true);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.OnLoggout.emit(null);
    this.router.navigate(['/login']);
    this.showMenuAndSide.emit(false);
  }

  resetPassword(email: string) {
    let body = { email: email };
    let url = environment.URL_BASE + '/api/resetpassword';
    return this.http.post(url, body).toPromise();
  }
}
