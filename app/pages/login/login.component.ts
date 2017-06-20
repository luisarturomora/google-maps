import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from 'ui/page';
import { Color } from 'color';
import { View } from 'ui/core/view';

import { User } from '../../models/user/user';
import { UserService } from "../../models/user/user.service";
import { AuthGuard } from '../../authguard.service';

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: './pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;
  @ViewChild('container') container : ElementRef;

  ngOnInit() {
    this.page.actionBarHidden = true;
  } 

  constructor(
    private router: Router, private userService : UserService, 
    private page : Page, private auth : AuthGuard 
    ){
    this.user = new User();
  }

  submit(){
    this.isAuthenticating = true;
    if(this.isLoggingIn){
      this.login();
    } else {
      this.signUp();
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.user = {
      email: '',
      password: ''
    }
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#E6E6FA"),
      duration: 200
    });
}

    login() {
      this.userService.login(this.user)
        .then(result => {
            this.isAuthenticating = false;
            this.auth.isLoggedIn = true;
            this.router.navigate(["/provinces"])
            }
          )
          .catch( error => {
            this.isAuthenticating = false;
            alert(error);
          });
    }

  signUp() {
    this.userService.register(this.user)
      .then( result => {
          this.isAuthenticating = false;
          alert("Hello, you can now sign in as " + this.user.email);
          this.toggleDisplay();
        })
        .catch( error => {
          this.isAuthenticating = false;
          alert(error);
        });
  }
}