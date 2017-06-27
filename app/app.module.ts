import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui-pro/listview/angular";
import { NativeScriptUICalendarModule } from "nativescript-telerik-ui-pro/calendar/angular";
import { NativeScriptUIChartModule } from "nativescript-telerik-ui-pro/chart/angular";
import { NativeScriptUIDataFormModule } from "nativescript-telerik-ui-pro/dataform/angular";

import * as firebase from 'nativescript-plugin-firebase';

import { routes, navigatableComponents, authProviders} from "./app.routing";

import { AppComponent } from "./app.component";

import { API_KEY } from './config';

import { ProvinceService } from './models/provinces/province.service';
import { UserService } from './models/user/user.service';

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


import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) { 
  GMSServices.provideAPIKey(API_KEY);
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    NativeScriptUICalendarModule,
    NativeScriptUIChartModule,
    NativeScriptUIDataFormModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  providers: [
    ...authProviders,
     ProvinceService,
     UserService
     ] ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}