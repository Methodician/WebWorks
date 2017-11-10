import * as L from "leaflet";

declare module "leaflet" {
    namespace tileLayer {
        export function bing(bing_key: string): any;
    }
    // namespace esri {
    //     export function basemapLayer(color: string): any;
    //     export function featureLayer(options: any): any;
    // }
}