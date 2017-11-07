import { features103 } from './features_client103';
import { features } from './features_client123';
import { material } from './materials';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class DataImportService {

  constructor(
    private db: AngularFirestore
  ) { }

  uploadCompanies() {
    let companyRef = this.getCompanies();
    companyRef.add({
      companyId: "9366dbea-832c-4fcc-b2b2-f9fcca40a6ca",
      clientId: 123,
      name: "Kodiak"
    });
    companyRef.add({
      companyId: "e405596a-630d-44d4-a02f-a979b27269a3",
      clientId: 103,
      name: "TerraSpatial"
    });
  }

  getCompanies() {
    return this.db.collection('companies');
  }

  refFeature103JSON() {
    return features103.features103;
  }

  uploadFeatures103() {
    let featRef = this.getFeatures();
    for (let feat of features103.features103) {
      let feature: any = feat;
      feature.ClientId = 103;
      featRef.add(feature);
    }
    alert('all features added for 103');
  }

  uploadFeatures123() {
    let featRef = this.getFeatures();
    for (let feat of features.features) {
      let feature: any = feat;
      feature.ClientId = 123;
      featRef.add(feature);
    }
    alert('all features 123 added');
  }

  getFeatures() {
    return this.db.collection('features');
  }

  uploadMaterials() {
    //let matRef = this.getMaterials();
    for (let mat of material.material) {
      console.log(mat);
      //matRef.add(mat);
    }
    alert('all materials added');
  }

  filterMatsByFeature(featureGUID: string) {
    return material.material.filter(
      mat =>
        mat.FeatureGUID.toUpperCase() == featureGUID.toUpperCase()
    );
  }

  getMaterials() {
    return this.db.collection('materials');
  }



}