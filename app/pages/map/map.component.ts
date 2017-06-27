import {Component, ViewChild} from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Page } from 'ui/page';

import { IProvince, Province } from '../../models/provinces/provinces';


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: 'map',
    templateUrl: 'pages/map/map.html',
})
export class MapComponent {

    province : IProvince;
    zoom = 8;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    lastCamera: String;

    firstTime : boolean = true;

    constructor( private page : Page) {
        this.province = Province.getProvinceSelected();
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object;

        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(this.province.lat, this.province.long);
        marker.title = this.province.name;
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        if(!this.firstTime){
            this.page.actionBar.title = "Google Maps";
        }

        this.firstTime = false;

        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

}