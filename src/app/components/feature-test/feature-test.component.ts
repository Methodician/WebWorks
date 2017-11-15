import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'app/services/map/feature.service';
import { UserService } from 'app/services/user/user.service';
import { Company } from 'app/shared/class/companyModel';

@Component({
  selector: 'app-feature-test',
  templateUrl: './feature-test.component.html',
  styleUrls: ['./feature-test.component.scss']
})
export class FeatureTestComponent implements OnInit {
  testData: any = null;

  loggedInUserCompany: Company;

  constructor(
    private featureSvc: FeatureService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.userSvc.userCompany$.subscribe(company => {
      this.loggedInUserCompany = company;
    });
  }

  clearTestData() {
    this.testData = null;
  }

  getMaterialsByFeatureId(featureId: string) {
    this.testData = this.featureSvc.getMaterialsByFeatureId(featureId).valueChanges();
  }

  getFeatureById(featureId: string) {
    this.testData = this.featureSvc.getFeatureById(featureId).valueChanges();
  }

  getTestCompaniesByName(name: string) {
    this.testData = this.featureSvc.getTestCompaniesByName(name).valueChanges();
  }

  getTestCompanyByCompanyGuid(companyGuid: string) {
    this.testData = this.featureSvc.getTestCompanyByCompanyGuid(companyGuid).valueChanges();
  }

  getTestCompanyByClientId(clientId: number) {
    this.testData = this.featureSvc.getTestCompanyByClientId(clientId).valueChanges();
  }

  getTestCompanyById(docId: string) {
    this.testData = this.featureSvc.getTestCompanyById(docId).valueChanges();
  }

}
