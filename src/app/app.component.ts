import { LoginService } from './shared/services/login.service';
import { LoginComponent } from './login/login.component';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['../assets/sass/imagine.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  showMenu = false;

  constructor(private loginService: LoginService,
    private router: Router) {
  }

  onActivate(e, outlet) {
    outlet.scrollTop = 0;
    outlet.scrollIntoView(0);
  }

  ngOnInit() {
    this.formatMenu();
  }

  formatMenu() {
    if (this.loginService.isLoggedIn) {
      this.loginService.showMenuAndSide.emit(true);
      this.showMenu = true;
    }
    this.loginService.showMenuAndSide.subscribe(
      show => this.showMenu = show
    );
  }
}
