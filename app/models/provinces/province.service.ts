import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

import { AuthGuard } from '../../authguard.service';

import { IProvince } from './provinces'; 
 
@Injectable()
export class ProvinceService {
 
    constructor() {
    }

    getList() : Promise<Array<object>> {
        return firebase.query(result => {}, '/list', {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'since' 
                },
            })
            .then(result => {
                return result.value;
            })
            .catch(error => {
                return error;
            })
    }

    // logout() : Promise<any> {
    //     this.authguard.isLoggedIn = false;
    //     return firebase.logout();
    // }
 
}