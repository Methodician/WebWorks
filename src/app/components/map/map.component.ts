import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

//import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

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

    let esriLayer = esri.basemapLayer('Imagery').addTo(map);

    /* L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWV0aG9kaWNpYW4iLCJhIjoiY2o5cnE4MGQ2MDFzcTMycGMzZDhvcDR5cCJ9.u2Dh_usx3AETevi_fVigeg', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(map); */
  }



  protected __onLayerAdded(payload: any): void {
    // if layer was added while loading in progress, this is an indication of the initial (application) load
    if (this._loading) {
      this._loading = false;

      // force change detection since we changed a bound property after the normal check cycle and outside anything that would trigger a 
      // CD cycle - this will eliminate the error you get when running in dev mode and provide another example of how this process works.
      this._chgDetector.detectChanges();
    }
  }

}
