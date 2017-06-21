import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

firebase.init({
    persist: false,
    storageBucket: 'gs://hello-e2914.appspot.com',
    onAuthStateChanged: (data: any) => {
        if (data.loggedIn) {
        data.token = data.user.uid;
        }
        else {
        data.token = "";
        }
    }
    }).then(
    function (instance) {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    });

    
 
@Injectable()
export class Data {
 
    public storage: any;
    public token : any;
 
    public constructor() {
    }

    getList(){
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
 
}