import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { UserService } from "./models/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn : boolean;

  constructor(private router: Router, private userService : UserService) {
      this.isLoggedIn = false;
   }

  canActivate() {
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}