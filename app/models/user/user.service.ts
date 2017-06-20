import { Injectable, Inject } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

@Injectable() 
export class UserService {

    login(user) {
        if(user.email && user.password){
            return firebase.login({
                type: firebase.LoginType.PASSWORD,
                email: user.email,
                password: user.password
            })
            .then( result => {
                    return Promise.resolve(result);
                })
            .catch( errorMessage => {
                return Promise.reject('Email or password are incorrect');
                }
            );
        } else {
            return Promise.reject('Type an email and password');
        }
    }

    register(user){
        if(user.email && user.password){
            if(user.password.length < 6){
                return Promise.reject('Password must be 6 characters or more');
            }
            return firebase.createUser({
                email: user.email,
                password: user.password
            })
            .then( result => {
                return Promise.resolve(result);
            })
            .catch( error => {
                return Promise.reject('Try again');
            })
        } else {
            return Promise.reject('Type an email and password');
        }
    }
}