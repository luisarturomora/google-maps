import { Injectable, Inject } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

import { IUser, User } from './user';
import { IResponse, Response } from '../service.response';

@Injectable() 
export class UserService {

    public static user : IUser;

    login( email : string, password : string ) : Promise<any> {
        if(email && password){
            return firebase.login({
                type: firebase.LoginType.PASSWORD,
                email: email,
                password: password
            })
            .then( result => {
                return Promise.resolve(result);
                })
            .catch( errorMessage => {
                return Promise.reject('Email or password are incorrect');
            });
        }
    }

    register( email : string, password : string ) : Promise<any> {
        if(email && password){
            if(password.length < 6){
                return Promise.reject('Password must be 6 characters or more');
            }
            return firebase.createUser({
                email: email,
                password: password
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

    private find(uid : string) : Promise<IResponse> {
        return firebase.query(
            result => {},
            `/users/`,
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'uid'
                },
                ranges: [
                    {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: uid
                    }
                ]
            })
            .then( result => {
                let response = new Response();
                    
                if(result.value){
                    response.result = result.value[uid];
                    response.success = true;
                    response.message = 'OK';
                    return response;
                }
                else {
                    response.error = 100;
                    response.success = false;
                    response.message = 'ERROR';
                    return response;
                }
            })
            .catch( error => {
                return error;
            })

    }

    getProfile( uid : string ) : Promise<IUser> {
        return this.find(uid)
            .then( result => {
                if(result && result.success){
                    return result.result;
                }
                else {
                    return new User();
                }
            })
            .catch( error => {
                return error;
            })
    }

    save( user : IUser ) : Promise<string> {
        return this.find(user.uid)
            .then( result => {
                if(!result) {
                    return firebase.setValue(`/users/${user.uid}`, user)
                    .then( result => {
                        return Promise.resolve('Saved');
                    })
                    .catch( error => {
                        return Promise.reject('Something is wrong');
                    })
                } else {
                    return this.update(user)
                        .then( result => {
                            return Promise.resolve(result);
                        })
                        .catch( error => {
                            return Promise.reject(error);
                        })
                }
            })
            .catch( error => {
                return Promise.resolve('Try Again');
            })
        
    }

    private update( user : IUser ) : Promise<string> {
        return firebase.update(`/users/${user.uid}`, user)
                    .then( result => {
                        return Promise.resolve('Updated');
                    })
                    .catch( error => {
                        return Promise.reject('Something is wrong');
                    })
    }
}