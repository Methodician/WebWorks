import { DataManipulationService } from './../../services/data-manipulation.service';
import { DataImportService } from './../../services/data/data-import.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {
  jsondata: any;
  testData = {
    '6g33J6106LS8kyOrK4Tv': [],
    'qhFRb5p7vuYXMe5AzXmo': []
  }
  clients = {
    103: '6g33J6106LS8kyOrK4Tv',
    123: 'qhFRb5p7vuYXMe5AzXmo'
  }

  constructor(
    private dataSvc: DataImportService,
    private manipSvc: DataManipulationService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.jsondata = this.dataSvc.pullOutputFromJson();
  }

  setTestCompanyFields() {
    this.dataSvc.setTestCompanyFields();
  }

  addTestOutput() {
    let companiesRef = this.dataSvc.getTestCompanies2();
    let itemCounter = 0;
    for (let item of this.jsondata) {
      if (itemCounter < 101) {
        let feature = {
          FeatureGuid: item.FeatureGuid || null,
          FeatureName: item.FeatureName || null,
          FeatureClass: item.FeatureClass || null,
          FeatureTypeCode: item.FeatureTypeCode || null,
          FeatureTypeName: item.FeatureTypeName || null,
          Circuit: item.Circuit || null,
          Phase: item.Phase || null,
          MapSpan: item.MapSpan || null,
          AssociatedFeatureName: item.AssociatedFeatureName || null,
          ClassConnectable: item.ClassConnectable || null,
          Block: item.Block || null,
          Geometry: item.Geometry.Geometry || null,
          ClientId: item.ClientId || null,
        }


        //  Forces some items in with materials (was mostly getting empty ones)
        if (item.Materials.length > 0) {
          //  Creates features using FeatureGUID
          let featureDoc = companiesRef.doc(this.clients[feature.ClientId]).collection('features').doc(feature.FeatureGuid);
          featureDoc.set(feature).then(() => {
            if (item.Materials.length > 0) {
              let matCollection = featureDoc.collection('materials');
              for (let mat of item.Materials) {
                matCollection.add(mat);
              }
            }
          });
        }


        // //  Creates features using Firebase IDs:
        // let featureCollection = testRef.doc(this.clients[feature.ClientId]).collection('features');
        // featureCollection.add(feature).then(docSnap => {
        //   if (item.Materials.length > 0) {
        //     let matCollection = docSnap.collection('materials');
        //     for (let mat of item.Materials) {
        //       matCollection.add(mat);
        //     }
        //   }
        // });

        itemCounter++;
      }
    }
  }

  // addMatsToCompanyFeatures(companyId: string) {
  //   let companyRef = this.manipSvc.getCompanyById(companyId);
  //   let companyFeatureRefs = companyRef.collection('features').snapshotChanges().map(snaps => {
  //     return snaps.map(snap => {
  //       const ref = snap.payload.doc.ref;
  //       const featureGUID = snap.payload.doc.data().FeatureGUID;
  //       return { ref, featureGUID };
  //     });
  //   });
  //   companyFeatureRefs.subscribe(refs => {
  //     for (let item of refs) {
  //       let ref = item.ref;
  //       let matColRef = ref.collection('materials');
  //       let mats = this.dataSvc.filterMatsByFeature(item.featureGUID);
  //       for (let mat of mats) {
  //         matColRef.add(mat);
  //       }
  //       alert('added all the materials');
  //     }
  //   });
  // }

  // getMatsForFeature(featureGUID: string) {
  //   console.log(this.dataSvc.filterMatsByFeature(featureGUID));
  // }

  // addMaterials() {
  //   this.dataSvc.uploadMaterials();
  // }

  // addFeatures123() {
  //   this.dataSvc.uploadFeatures123();
  // }

  // addFeatures103() {
  //   this.dataSvc.uploadFeatures103();
  // }

  // addCompanies() {
  //   this.dataSvc.uploadCompanies();
  // }



}
