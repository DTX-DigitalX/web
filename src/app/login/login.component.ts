import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { UserService } from './../shared/services/user.service';
import { LoginService } from '../shared/services/login.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  submitAttemptLogin = false;
  msgError = null;
  user: User;
  showLoginFormUser = true;
  showLoginFormPassword = false;
  credential: any;
  name = "";
  photo = "";
  email = "";

  constructor(
    private authService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }


  ngOnInit() {
  }

  public loginFormUser = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required])]
  });

  public loginFormPassword = this.formBuilder.group({
    password: ['', Validators.required]
  });

  async userData() {
    
    this.msgError = '';

    this.submitAttemptLogin = true;
    if (!this.loginFormUser.valid) {
      return;
    }

    try {
      this.credential = await this.authService.user(this.loginFormUser.value.username);
      if (this.credential) {
        console.log(this.credential);
        this.name = this.credential.name;
        this.email = this.credential.email;
        this.photo = "data:image/png;base64," + this.credential.photo;
        this.showLoginFormUser = false;
        this.showLoginFormPassword = true;
        this.submitAttemptLogin = false;
      }
    }
    catch (error) {
      this.msgError = 'Erro ao localizar credencial, por favor verifique sua conexão com a internet';

      if (error.code === 400) {
        this.msgError = 'Credencial inválida! Por favor, tente novamente!';
      }
      console.log(error);
    }
  }

  async login() {
    try {
      this.msgError = '';

      await this.authService.login(this.loginFormUser.value.username, this.loginFormPassword.value.password);

      await this.userService.getUser();

      await this.authService.iniciar();
      
      console.log('User storaged');
      this.user = this.userService.user;
      console.log(this.user);

      if (this.user.isFullRegister) {
        this.router.navigate(['./dashboard']);
      } else {
        this.router.navigate(['./register']);
      }
    }
    catch (error) {
      this.msgError = 'Erro ao se autenticar, por favor verifique sua conexão com a internet';

      if (error.code === 400) {
        this.msgError = 'Login ou senha inválidos! Por favor, tente novamente!';
      }
      console.log(error);
    }
  }
}
