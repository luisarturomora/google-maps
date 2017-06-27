export interface IResponse {
    success : boolean;
    result : any;
    error : number;
    message : string;
}

export class Response implements IResponse {
    constructor(public success = false, public result = null, public error = 0, public message = '' ){}
}

export const USER_NOT_FOUND = 100;