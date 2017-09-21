import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService

  ) {

  }

  canActivate() {

    if (!this.loginService.isLoggedIn) {
      this.router.navigateByUrl('/login')
      return false;
    }

    if (this.userService.user.isFullRegister == false) {
      console.log("not full register");
      return true;
    }

    this.router.navigateByUrl('/dashboard')
    console.log("full register");
    return false;

  }
}
