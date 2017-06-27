import { Component } from '@angular/core';
import { DatePicker } from 'ui/date-picker';

import { IUser, User } from '../../models/user/user';

@Component({
    selector: 'profile',
    templateUrl: 'pages/profile/profile.html',
    styleUrls: ['pages/profile/profile-common.css']
})
export class ProfileComponent {
    user  = new User();

    constructor(){
        User.getProfile(this.user.uid)
            .then(result => {
                this.user = new User();
            })
            .catch(error => {
                console.log(error)
            })
    }

    save() : void {
        if(this.user.name != '' && this.user.lastname != ''){
            this.user.save()
                .then( result => {
                    alert(result);
                })
                .catch( error => {
                    alert(error);
                })
        } else {
            alert('Something is empty');
        }
    }

    onPickerLoaded(event) : void {
        User.getProfile(this.user.uid)
            .then(result => {
                this.user.email = result.email;
                this.user.birthday = result.birthday;
                this.user.lastname = result.lastname;
                this.user.name = result.name;
                this.user.uid = result.uid;
                
                let birthday = new Date();
                if(this.user.birthday != undefined){
                    if(this.user.birthday != ''){
                    birthday = new Date(this.user.birthday);
                    }
                }
                let datePicker = <DatePicker>event.object;

                datePicker.month = new Date(birthday).getMonth() + 1;
                datePicker.day = new Date(birthday).getDate();
                datePicker.year = new Date(birthday).getFullYear();
            })
            .catch(error => {
                console.log(error)
            })
        
    }

    dateChange(event) : void{
        let month = event.value.getMonth() + 1;
        this.user.birthday = event.value.getFullYear() + '/' + month + '/' + event.value.getDate();
    }

}