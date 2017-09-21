import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'

import { LoginService } from '../shared/services/login.service'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitAttemptRegister: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(
    private authService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });

    this.showErrorMessage = false;
    this.showSuccessMessage = false;

  }

  resetPassword() {

    this.submitAttemptRegister = true;

    if (!this.resetPasswordForm.valid) {
      return;
    }

    this.authService.resetPassword(this.resetPasswordForm.value.email)
    .then(()=>{
      this.showSuccessMessage = true;
      this.showErrorMessage = false;

      setTimeout(()=>{
        this.router.navigateByUrl('/login');
      },2000)

    })
    .catch(()=>{
      this.showSuccessMessage = false;
      this.showErrorMessage = true;
    });
  }
}
