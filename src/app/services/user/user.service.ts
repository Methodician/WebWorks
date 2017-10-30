import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor(private fs: AngularFirestore) { }

  getCompanies() {
    return this.fs.collection('companies');
  }

}
