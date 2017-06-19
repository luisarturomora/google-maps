import { Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import * as SocialShare from 'nativescript-social-share';
import { Page } from 'ui/page';

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
  frame = {};

  constructor(private router : Router, private data : Data, private page : Page){
  }

  ngOnInit() {
    this.page.actionBarHidden = false;
    this.isLoading = true;
    this.provincesList = this.data.provinces;
    this.isLoading = false;
    this.listLoaded = true;
  }

  toMap(province){
    this.data.storage = province;
    this.router.navigate(['/map']);
  }
}