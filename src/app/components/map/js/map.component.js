var L = require('leaflet');
var esri = require('esri-leaflet');

export function initializeMap(){
    let map = L.map('map').setView([45.523062, -122.676482], 13);
    let esriLayer = esri.basemapLayer('Gray').addTo(map);
}