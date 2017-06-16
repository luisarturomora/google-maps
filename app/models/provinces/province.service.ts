import { Injectable } from '@angular/core';

var file = require('../../file.json');
 
@Injectable()
export class Data {
 
    public storage: any;

    public provinces = file.list;
 
    public constructor() { }
 
}