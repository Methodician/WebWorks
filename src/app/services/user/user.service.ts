import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {

  uid$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userCompany$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private fs: AngularFirestore) {

    this.uid$.subscribe(id => {
      if (id) {
        this.getUserById(id).valueChanges().subscribe(userInfo => this.userInfo$.next(userInfo));
        this.getUserCompanyById(id).valueChanges().subscribe(company => this.userCompany$.next(company));
      }
    })
  }

  getCompanies() {
    return this.fs.collection('companies');
  }

  getUserById(uid: string) {
    return this.fs.collection('users').doc(uid);
  }

  getUserCompanyById(uid: string) {
    return this.getUserById(uid).collection('userData').doc('company');
  }

  createUser(uid: string, user: any, company: any) {
    let userRef = this.getUserById(uid);
    let companyRef = userRef.collection('userData').doc('company');
    userRef.set(user);
    companyRef.set(company);
  }

}
