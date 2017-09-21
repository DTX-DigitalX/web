import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../shared/services/user.service';
import { User } from './../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  submitAttemptRegister = false;
  phone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  enrolment = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: ['', this.customValidateEmail],
      phone: ['', this.checkPhoneMinlength],
      document: ['', Validators.required],
      enrolment: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.matchingPasswordsAndValidateContact('password', 'confirmPassword', 'email', 'phone')
      }
    );
  }

  register() {

    this.submitAttemptRegister = true;

    if (!this.registerForm.valid) {
      return;
    }

    this.userService.updateUser(this.user)
      .then(() => {
        return this.userService.getUser();
      })
      .then(() => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  checkPhoneMinlength(fieldControl: FormControl) {

    if (!fieldControl.value)
      return;

    const unmask = fieldControl.value
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(/_/g, '')
      .replace(' ', '');

    if (unmask.length === 0) {
      return null;
    }

    return unmask.length >= 10 ? null : { phoneLength: true };
  }

  customValidateEmail(fieldControl: FormControl) {
    if (!fieldControl.value)
      return null;


    if (fieldControl.value.length === 0)
      return null;

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(fieldControl.value) ? null : { email: true };
  }

  matchingPasswordsAndValidateContact(passwordKey: string, passwordConfirmationKey: string, email: string, phone: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];

      const phoneInput = group.controls[phone];
      const emailInput = group.controls[email];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({ notEquivalent: true });
      }

      // if (!emailInput.value && !phoneInput.value) {
      //   emailInput.setErrors({ required: true });
      //   phoneInput.setErrors({ required: true });
      // }

      return null;
    };
  }
}
