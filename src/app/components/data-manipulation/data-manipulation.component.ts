import { DataManipulationService } from './../../services/data-manipulation.service';
import { Component, OnInit } from '@angular/core';
import { DataImportService } from "./../../services/data/data-import.service";
//import * as pako from 'pako';
//import * as jsZip from 'jszip';

@Component({
  selector: 'app-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.scss']
})
export class DataManipulationComponent implements OnInit {

  data: any;
  rawData: any;

  constructor(private dataSvc: DataManipulationService, private importSvc: DataImportService) { }

  ngOnInit() {
    this.rawData = this.importSvc.refFeature103JSON;
  }

  fileSelected($event) {
    let file = $event.target.files[0];
    this.rawData = file;
  }

  getData() {
    return this.getCompanies().subscribe(co => {
      this.data = co;
    });
  }

  putFeaturesUnderClient() {
    this.getFeaturesForClient(123).valueChanges()
      .subscribe(features => {
        alert('got features for client');
        alert(features);
        this.pushFeaturesToCompany('qhFRb5p7vuYXMe5AzXmo', features);
      });
  }

  getFeaturesForClient(clientId: number) {
    alert('getting features for client');
    return this.dataSvc.getFeaturesForClient(clientId);
  }

  pushFeaturesToCompany(companyId: string, features: any[]) {
    let companyDoc = this.dataSvc.getCompanyById(companyId);
    alert('got the company to put them under');
    let featureCollection = companyDoc.collection('features');
    for (let feature of features) {
      featureCollection.add(feature);
    }
    alert('sent all the feature adds to Firestore');
  }

  getCompanies() {
    return this.dataSvc.getCompanies().snapshotChanges().map(coSnaps => {
      return coSnaps.map(co => {
        const data = co.payload.doc.data();
        const id = co.payload.doc.id;
        return { id, ...data }
      });
    });
  }

}
