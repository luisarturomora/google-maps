import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { Data } from './models/provinces/province.service';

import * as platform from "platform";
declare var GMSServices: any;

if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyDt86GfCXb45aYlvJT_iMxE7me2bKSCFbk");
}

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  providers: [ Data ] ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}