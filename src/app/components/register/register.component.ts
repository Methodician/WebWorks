import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AuthInfo } from './../../services/auth/auth-info';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { validateEmail } from "app/components/validators/validateEmail";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  authInfo: AuthInfo;

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [validateEmail, Validators.required]],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })
  }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  register() {
    const val = this.form.value;

    this.authSvc.register(val.email, val.password)
      .subscribe(
      success => {
        delete val.password;
        delete val.confirmPass;
        this.authSvc.sendVerificationEmail();
        alert('Thanks for creating an account!')
        this.router.navigateByUrl('/home');
      },
      fail => alert(fail)
      );
  }

  isErrorVisible(field: string, error: string) {
    let control = this.form.controls[field];
    return control.dirty && control.errors && control.errors[error];
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val.password && val.password == val.confirmPass;
  }

  isControlDirty(field: string) {
    let control = this.form.controls[field];
    return control.dirty;
  }

  formValid() {
    return this.form.valid;
  }

}
