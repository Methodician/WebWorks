import { UserService } from './../user/user.service';
import * as firebase from 'firebase';
import { AuthInfo } from './auth-info';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);
  user$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);
  accessLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userSvc: UserService
  ) {
    this.afAuth.authState.subscribe(info => {
      if (info) {
        this.user$.next(info);
        const authInfo = new AuthInfo(info.uid, info.emailVerified);
        this.authInfo$.next(authInfo);
        this.userSvc.uid$.next(info.uid);
        this.getAccessLevel(info.uid).valueChanges().subscribe((levelInfo: any) => this.accessLevel$.next(levelInfo.level));
      }
    });
  }

  getAccessLevel(uid: string) {
    let userRef = this.userSvc.getUserById(uid);
    return userRef.collection('userData').doc('accessLevel');
  }

  setAccessLevel(uid: string, level: number) {
    let levelRef = this.getAccessLevel(uid);
    return levelRef.set({ level: level });
  }

  register(email, password) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('Your password should be stronger.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }));
  }

  login(email, password) {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/wrong-password') {
          alert('Please enter the correct password.');
        } else if (errorCode == 'auth/user-not-found') {
          alert('We don\'t have any record of a user with that email address.')
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.user$.next(null);
    location.reload();
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise
      .then(res => {
        const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid, res.emailVerified);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });
    return subject.asObservable();
  }

  sendVerificationEmail() {
    let user = this.afAuth.auth.currentUser;
    console.log('afAuth.auth.currentUser:', user);
    user.sendEmailVerification().then(() => {
    }, (error) => {
      alert('It looks like your verification email was not sent. Please try again or contact support.');
    });
  }

  isLoggedInCheck(): Observable<boolean> {
    return this.afAuth.authState.map(info => {
      return (info && info.uid) ? true : false;
    }
    ).take(1)
      .do(allowed => {
        if (!allowed) {
          if (confirm('You must be logged in to do that. Would you like to be redirected?'))
            this.router.navigate(['/login']);
        }
      });
  }

}
