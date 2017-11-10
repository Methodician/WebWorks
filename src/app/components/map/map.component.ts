import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

//import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
// Should consider using "leaflet-plugins" instead...
//import * as bing from 'leaflet-bing-layer';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  protected _loading: boolean = true;

  //@ViewChild(LeafletMapComponent) _leafletMap: LeafletMapComponent;

  constructor(private _chgDetector: ChangeDetectorRef) { }

  ngOnInit() {
    let map = L.map('map').setView([45.523062, -122.676482], 13);

    let esriLayer = esri.basemapLayer('Gray').addTo(map);
    //let bingLayer = L.tileLayer.bing('AtAl8oo3GIVsAsSBK3Uk9ZGFaevt1NWlPVGZjzlCRmyk8_kXwIaDQOd7heinQRIS');
    esriLayer.addTo(map);
  }



  // protected __onLayerAdded(payload: any): void {
  //   // if layer was added while loading in progress, this is an indication of the initial (application) load
  //   if (this._loading) {
  //     this._loading = false;

  //     // force change detection since we changed a bound property after the normal check cycle and outside anything that would trigger a 
  //     // CD cycle - this will eliminate the error you get when running in dev mode and provide another example of how this process works.
  //     this._chgDetector.detectChanges();
  //   }
  // }

}
