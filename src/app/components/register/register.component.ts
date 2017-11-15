import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { AuthInfo } from './../../services/auth/auth-info';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { validateEmail } from "app/shared/validators/validateEmail";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  authInfo: AuthInfo;
  companies: any[];
  selectedCo: any;

  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [validateEmail, Validators.required]],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      username: ['', Validators.required],
      company: [null, Validators.required]
    })
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userSvc.getCompanies()
      .snapshotChanges().map(companySnaps => {
        return companySnaps.map(co => {
          const data = co.payload.doc.data();
          const id = co.payload.doc.id;
          return { id, ...data };
        })
      })
      .subscribe(companies => {
        if (companies) {
          this.companies = companies;
          this.selectedCo = companies[0];
        }
      });
  }

  selectCo(company: any) {
    console.log(company);
    this.form.controls['company'].patchValue(company);
  }

  register() {
    const val = this.form.value;
    const user = {
      email: val.email,
      username: val.username
    }
    const company = val.company;
    this.authSvc.register(val.email, val.password)
      .subscribe(
      success => {
        delete val.password;
        delete val.confirmPass;
        this.userSvc.createUser(success.uid, user, company);
        this.authSvc.setAccessLevel(success.uid, 10);
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
