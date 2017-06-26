export class Province {
    constructor(public name : string = "", public lat: number = 0, public long : number = 0){}

    public helloWorld() : void {

    }

    public static fromJson(json : object) : Province{
        return new Province("", 1, 1);
    }
}