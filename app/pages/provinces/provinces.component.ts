import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import * as SocialShare from 'nativescript-social-share';
import { Page } from 'ui/page';
import { RadSideDrawerComponent } from "nativescript-telerik-ui-pro/sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-telerik-ui-pro/sidedrawer';

import { Province } from '../../models/provinces/provinces';
import { Data } from '../../models/provinces/province.service';

@Component({
  selector: "province",
  templateUrl: "pages/provinces/provinces.html",
  styleUrls: ["pages/provinces/provinces-common.css", "pages/provinces/provinces.css"],
})

export class ProvincesComponent implements OnInit {
  provincesList: Array<Province> = [];
  isLoading = false;
  listLoaded = false;
  showBack = false;
  title = 'Provinces';

  constructor(
    private router : Router, private data : Data, private page : Page,
    private _changeDetectionRef: ChangeDetectorRef
    )
  {
  }

  ngOnInit() {
    this.isLoading = true;
    this.data.getList()
    .then(result => {
      this.provincesList = result;
    })
    
    this.isLoading = false;
    this.listLoaded = true;
  }

  toMap(province){
    this.data.storage = province
    this.router.navigate(['/map']);
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

   private _mainContentText: string;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
    }
}