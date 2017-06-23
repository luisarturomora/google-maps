import { Component } from '@angular/core';

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
        profileService.getProfile()
            .then(result => {
                console.dir(result)
                this.user = result;
            })
            .catch(error => {
                console.log(error)
            })
    }

    save(){
        this.profileService.save(this.user)
            .then( result => {
                alert(result);
            })
            .catch( error => {
                alert(error);
            })
    }


}