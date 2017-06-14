import { Component, OnInit } from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";

import { Province } from '../../models/provinces/provinces';
import { Data } from '../../models/provinces/province.service';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: 'map',
    templateUrl: 'pages/map/map.html'
})

export class MapComponent implements OnInit {
    province : Province;

    constructor(private data : Data){
        this.province = data.storage;
    }

    ngOnInit(){
    }
}