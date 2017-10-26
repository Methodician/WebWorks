import { AuthInfo } from './../services/auth/auth-info';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  user: AuthInfo;
  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit() {
    this.authSvc.authInfo$.subscribe(info => this.user = info);
  }

  logout() {
    this.authSvc.logout();
  }

}
