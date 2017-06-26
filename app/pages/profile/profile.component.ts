import { Component } from '@angular/core';
import { DatePicker } from 'ui/date-picker';

import { ProfileService } from '../../models/profile/profile.service';
import { UserProfile } from '../../models/profile/profile';

@Component({
    selector: 'profile',
    templateUrl: 'pages/profile/profile.html',
    styleUrls: ['pages/profile/profile-common.css']
})
export class ProfileComponent {
    user : UserProfile = {
        uid: '',
        email: '',
        name: '',
        lastname: '',
        birthday: ''
    }

    constructor( private profileService : ProfileService ){
        this.profileService.getProfile()
            .then(result => {
                this.user = result;
            })
            .catch(error => {
                console.log(error)
            })
    }

    save(){
        if(this.user.name != '' && this.user.lastname != ''){
            this.profileService.save(this.user)
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

    onPickerLoaded(event){
        this.profileService.getProfile()
            .then(result => {
                this.user = result;
                let birthday = new Date();
                if(this.user.birthday != ''){
                    birthday = new Date(this.user.birthday);
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

    dateChange(event){
        let month = event.value.getMonth() + 1;
        this.user.birthday = event.value.getFullYear() + '/' + month + '/' + event.value.getDate();
    }

}