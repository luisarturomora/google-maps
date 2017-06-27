import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router'
import { Page } from 'ui/page';
import { Color } from 'color';
import { View } from 'ui/core/view';

import { User, IUser } from '../../models/user/user';
import { AuthGuard } from '../../authguard.service';

@Component({
  selector: "my-app",
  templateUrl: './pages/login/login.html',
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit {
  user = new User();
  isLoggingIn : boolean = true;
  isAuthenticating : boolean = false;
  @ViewChild('container') container : ElementRef;

  ngOnInit() {
    this.isAuthenticating = false;
    this.page.actionBarHidden = true;
  } 

  constructor(
    private router: Router, private routerExtensions : RouterExtensions,
    private page : Page, private auth : AuthGuard
    ){
        this.user.email = 'luis@gmail.com';
  }

  submit() : void {
    this.isAuthenticating = true;
    if(this.isLoggingIn){
      this.login();
    } else {
      this.signUp();
    }
  }

  toggleDisplay() : void {
    this.isLoggingIn = !this.isLoggingIn;
    this.user.email = '';
    this.user.password = '';
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#E6E6FA"),
      duration: 200
    });
}

    login() : void {
      if(this.user.email && this.user.password){
        User.login(this.user.email, this.user.password)
          .then(result => {
            this.user = result;
            User.getProfile(this.user.uid)
              .then( result => {
                this.isAuthenticating = false;
                this.auth.isLoggedIn = true;
                this.routerExtensions.navigate(["/provinces"], {clearHistory: true});
              }).catch( error => {
                alert(error);
              })
          })
            .catch( error => {
              this.isAuthenticating = false;
              alert(error);
            });
      } else {
        alert('Type an email and a password');
      }
    }

  signUp() : void { 
    User.register(this.user.email, this.user.password)
      .then( result => {
        this.user.birthday = '';
        this.user.uid = result.key;
          this.user.save()
            .then( result => {
              this.isAuthenticating = false;
              alert("Hello, you can now sign in as " + this.user.email);
              this.toggleDisplay();
            })
        })
        .catch( error => {
          this.isAuthenticating = false;
          alert(error);
        });
  }
}