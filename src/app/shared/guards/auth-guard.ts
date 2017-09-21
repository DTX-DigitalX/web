import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) { }

  canActivate() {
    if (this.loginService.isLoggedIn) {
      if (!this.userService.user.isFullRegister) {
        this.router.navigate(['/register']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
