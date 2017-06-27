import { UserService } from './user.service';

export interface IUser {
    uid: string;
    email : string;
    password : string;
    name : string;
    lastname : string;
    birthday : string;

    save() : Promise<string>;
}

export class User implements IUser {
    uid: string;
    email : string;
    password : string;
    name : string;
    lastname : string;
    birthday : string = '';

    private static user = new User();

    public static login(email : string, password : string) : Promise<User> { 
        var service = new UserService();
        return service.login(email, password)
            .then( result => {
                this.user.uid = result.uid;
                this.user.email = result.email;
                return this.user;
            })
            .catch( error => {
                return Promise.reject('error');
            })
    }

    public static register(email : string, password : string): Promise<any> {
        var service = new UserService();
        return service.register(email, password)
                    .then( result => {
                        return Promise.resolve(result)
                    })
                    .catch( () => {
                        return Promise.reject('error');
                    })
    }

    public static getProfile(uid : string) : Promise<User> {
        var service = new UserService();
        let user = new User();

        if(uid){
            user.uid = uid;
        } else {
            user.uid = User.user.uid;
        }

        return service.getProfile(user.uid)
                    .then( result => {
                        User.user = result;
                        return Promise.resolve(result);
                    })
                    .catch( error => {
                        return Promise.reject(error);
                    })
    }

    public save() : Promise<string> {
        var service = new UserService();
        return service.save(this)
                    .then( result => {
                        return Promise.resolve(result);
                    })
                    .catch( error => {
                        return Promise.reject(error);
                    })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}