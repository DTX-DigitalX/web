import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { HttpClient } from './../config/HttpClient';
import { LoginService } from './login.service';
import { environment } from '../../../environments/environment';
import { User } from './../models/user.model';

@Injectable()
export class UserService {
  user: User;
  endpoint = '/api/user';
  constructor(
    private authService: LoginService,
    private httpClient: HttpClient
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.authService.OnLoggout.subscribe(() => {
      this.user = null;
    });
  }

  getUser() {
    const url = environment.URL_BASE + this.endpoint;
    console.log(url);
    return this.httpClient.get(url)
      .map((response: Response) => {
        localStorage.setItem('user', JSON.stringify(response.json()));
        this.user = <User>JSON.parse(JSON.stringify(response.json()));
        return this.user;
      })
      .toPromise();
  }

  updateUser(user) {
    const url = environment.URL_BASE + this.endpoint;
    return this.httpClient.put(url, user).toPromise();
  }

  deleteUser(id) {
  }

  searchContribuitor(name: string, enrolment: string) {
    const url = `${environment.URL_BASE}${this.endpoint}/find`;
    return this.httpClient.get(url, { name: name, enrolment: enrolment })
      .map((response: Response) => {
        const users = JSON.parse(JSON.stringify(response.json()));
        return users;
      });
  }
}
