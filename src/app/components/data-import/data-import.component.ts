import { DataManipulationService } from './../../services/data-manipulation.service';
import { DataImportService } from './../../services/data/data-import.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {

  constructor(
    private dataSvc: DataImportService,
    private manipSvc: DataManipulationService
  ) { }

  ngOnInit() {

  }

  addMatsToCompanyFeatures(companyId: string) {
    let companyRef = this.manipSvc.getCompanyById(companyId);
    let companyFeatureRefs = companyRef.collection('features').snapshotChanges().map(snaps => {
      return snaps.map(snap => {
        const ref = snap.payload.doc.ref;
        const featureGUID = snap.payload.doc.data().FeatureGUID;
        return { ref, featureGUID };
      });
    });
    companyFeatureRefs.subscribe(refs => {
      for (let item of refs) {
        let ref = item.ref;
        let matColRef = ref.collection('materials');
        let mats = this.dataSvc.filterMatsByFeature(item.featureGUID);
        for (let mat of mats) {
          matColRef.add(mat);
        }
        alert('added all the materials');
      }
    });
  }

  getMatsForFeature(featureGUID: string) {
    console.log(this.dataSvc.filterMatsByFeature(featureGUID));
  }

  addMaterials() {
    this.dataSvc.uploadMaterials();
  }

  addFeatures123() {
    this.dataSvc.uploadFeatures123();
  }

  addFeatures103() {
    this.dataSvc.uploadFeatures103();
  }

  addCompanies() {
    this.dataSvc.uploadCompanies();
  }



}
