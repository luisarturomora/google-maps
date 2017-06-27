import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import * as SocialShare from 'nativescript-social-share';
import { Page } from 'ui/page';
import { RadSideDrawerComponent } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';
import * as platform from 'platform';

import { IProvince, Province } from '../../models/provinces/provinces';

@Component({
  selector: "province",
  templateUrl: "pages/provinces/provinces.html",
  styleUrls: ["pages/provinces/provinces-common.css", "pages/provinces/provinces.css"],
})



export class ProvincesComponent implements OnInit {
  provincesList: Array<IProvince> = [];
  province : IProvince;
  isLoading = false;
  listLoaded = false;

  
  constructor(
    private router : Router, private page : Page,
    private _changeDetectionRef: ChangeDetectorRef, private routerExtensions : RouterExtensions
    )
  {
  }

  ngOnInit() {
    this.isLoading = true;
    Province.getList()
    .then(result => {
      this.provincesList = result;
    })

    if(platform.isIOS){
      this.page.actionBar.navigationButton.visibility = "collapse";    
    }
    this.isLoading = false;
    this.listLoaded = true;
  }

  toMap(province){
    Province.selectProvince(province);
    this.router.navigate(['/map']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
    this.onCloseDrawerTap();
  }

   private _mainContentText: string;

    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    openDrawer() {
        this.drawer.showDrawer();
    }

    onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }

    logout(){
      this.onCloseDrawerTap();
      //this.data.logout();
      this.routerExtensions.navigate(['/login'], {clearHistory: true});
    }
}