import { Component, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';

@Component({
  selector: 'leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent {
  //  ALL FOLLOWING CONTENTS TAKEN DIRECTLY FROM Angular2Leaflet example

  protected _map: Map;

  @Output() layerAdded: EventEmitter<any> = new EventEmitter();
  @Output() layerRemoved: EventEmitter<any> = new EventEmitter();
  /**
    * Construct a new Leaflet Map component
    *
    * @return nothing
    */
  constructor() {
    // empty
  }

  /**
   * Initialize the map
   *
   * @param params: Object Map params recognized by Leaflet
   *
   * @param tileData: Object containing 'url' and 'attribution' data for the tile layer
   *
   * @return nothing The leaflet map is created, intialized with the supplied parameters, and assigned to the DIV created in the component template.  A single
   * tile layer is addes
   */
  public initialize(params: Object, tileData: Object): void {
    // the div id is hardcoded in this example - a future example will show how to make this component more general
    this._map = L.map('leaflet-map', params);

    // events supported in this demo
    this._map.on('layeradd', () => { this.__onLayerAdded() });
    this._map.on('layerremove', () => { this.__onLayerRemoved() });

    // add a single tile layer
    L.tileLayer(tileData['url'], { attribution: tileData['attribution'] }).addTo(this._map);
  }

  /**
   * Move the map to the input location
   *
   * @param lat: number Location latitude in degrees
   *
   * @param long: number Location longitude in degrees
   */
  public toLocation(lat: number, long: number): void {
    this._map.panTo([lat, long]);
  }

  protected __onLayerAdded(): void {
    // perform additional logic on layer added here
    this.layerAdded.emit();
  }

  protected __onLayerRemoved(): void {
    // perform additional logic on layer removed here
    this.layerRemoved.emit();
  }

}
