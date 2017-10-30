import { DataImportService } from './../../services/data/data-import.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.scss']
})
export class DataImportComponent implements OnInit {

  constructor(
    private dataSvc: DataImportService
  ) { }

  ngOnInit() {

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
