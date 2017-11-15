import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from 'app/services/user/user.service';
import { Company } from 'app/shared/class/companyModel';

@Injectable()
export class FeatureService {

  loggedInUserCompany: Company;

  constructor(
    private afs: AngularFirestore,
    private userSvc: UserService
  ) {
    this.userSvc.userCompany$.subscribe(company => {
      this.loggedInUserCompany = company;
    });
  }

  getMaterialsByFeatureId(featureId: string) {
    return this.getFeatureById(featureId).collection('materials');
  }

  getFeatureById(featureId: string) {
    return this.getTestCompanyById(this.loggedInUserCompany.companyId).collection('features').doc(featureId);
  }

  getTestCompaniesByName(name: string) {
    return this.afs.collection('testCompanies', ref => ref.where('name', '==', name));
  }
  getTestCompanyByCompanyGuid(companyGuid: string) {
    return this.afs.collection('testCompanies', ref => ref.where('companyGuid', '==', companyGuid));
  }

  getTestCompanyByClientId(clientId: number) {
    return this.afs.collection('testCompanies', ref => ref.where('clientId', '==', +clientId));
  }

  getTestCompanyById(docId: string) {
    return this.afs.collection('testCompanies').doc(docId);
  }

  getCompanyById(docId: string) {
    return this.afs.collection('companies').doc(docId);
  }


}
