import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class DataManipulationService {

  constructor(
    private fs: AngularFirestore
  ) { }

  getCompanies() {
    return this.fs.collection('companies');
  }

  getCompanyById(companyId: string) {
    let companiesRef = this.getCompanies();
    return companiesRef.doc(companyId);
  }

  getFeaturesForClient(clientId: number) {
    return this.fs.collection('features', ref => ref.where('ClientId', '==', clientId));
  }
  /* 
    [
      {
        "id": "6g33J6106LS8kyOrK4Tv",
        "clientId": 103,
        "companyId": "e405596a-630d-44d4-a02f-a979b27269a3",
        "name": "TerraSpatial"
      },
      {
        "id": "qhFRb5p7vuYXMe5AzXmo",
        "clientId": 123,
        "companyId": "9366dbea-832c-4fcc-b2b2-f9fcca40a6ca",
        "name": "Kodiak"
      }
    ]
   */
}
