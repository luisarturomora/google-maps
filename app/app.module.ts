import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { routes, navigatableComponents, authProviders} from "./app.routing";
import { AppComponent } from "./app.component";
import { Data } from './models/provinces/province.service';
import { UserService } from './models/user/user.service';
import { API_KEY } from './config';

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
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  providers: [
    ...authProviders,
     Data,
     UserService
     ] ,
  bootstrap: [ AppComponent ]
})
export class AppModule {}