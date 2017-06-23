import { Injectable, Inject } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';

import { UserProfile } from './profile';

@Injectable() 
export class ProfileService {

    public user : UserProfile = {
        email: '',
        uid: '',
        name: '',
        lastname: '',
        birthday: ''
    }

    find(){
        return firebase.query(
            result => {},
            '/users',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'uid'
                },
                ranges: [
                    {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: this.user.uid
                    }
                ]
            })
            .then( result => {
                if(result.value)
                    return result.value[this.user.uid];
                else 
                    return undefined;
            })
            .catch( error => {
                return error;
            })

    }

    getProfile(){
        return this.find()
            .then( result => {
                if(result){
                    return result;
                }
                else 
                    return this.user;
            })
            .catch( error => {
                return error;
            })
    }

    save(user) {
        this.user = user;

        return this.find()
            .then( result => {
                if(!result) {
                    return firebase.setValue('/users/' + this.user.uid, this.user)
                    .then( result => {
                        return Promise.resolve('Saved');
                    })
                    .catch( error => {
                        return Promise.reject('Something is wrong');
                    })
                } else {
                    this.update(this.user)
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

    update(user) {
        return firebase.update('/users/' + this.user.uid, user)
                    .then( result => {
                        return Promise.resolve('Updated');
                    })
                    .catch( error => {
                        return Promise.reject('Something is wrong');
                    })
    }

}