import { UserService } from './../services/user/user.service';
import { AuthInfo } from './../services/auth/auth-info';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  auth: AuthInfo;
  user: any;
  userCompany: any;
  //accessLevel: number;
  constructor(
    private authSvc: AuthService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.authSvc.authInfo$.subscribe(info =>
      this.auth = info
    );
    this.userSvc.userInfo$.subscribe(info =>
      this.user = info
    );
    this.userSvc.userCompany$.subscribe(info =>
      this.userCompany = info
    );
    //this.authSvc.accessLevel$.subscribe(level => this.accessLevel = level);

  }

  logout() {
    this.authSvc.logout();
  }

}
