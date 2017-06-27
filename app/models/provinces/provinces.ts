import { ProvinceService } from './province.service'

export interface IProvince {
    name : string;
    lat: number; 
    long : number;
}

export class Province implements IProvince {
    constructor(public name : string , public lat: number , public long : number){}

    private static province : IProvince;

    public static getList() : Promise<Array<IProvince>> {
        var service : ProvinceService = new ProvinceService();
        return service.getList()
                .then( (result : Array<IProvince>) => {

                    const list : Array<IProvince> = result;
                    return Promise.resolve(list);
                })
                .catch( error => {
                    return Promise.reject(error);
                })
    }

    // public logout() : Promise<any> {
    //     return this.provinceService.logout()
    //             .then( result => {
    //                 return Promise.resolve(result);
    //             })
    //             .catch( error => {
    //                 return Promise.reject(error);
    //             })
    // }

    public static selectProvince(province : IProvince) : void {
        this.province = province;
    }

    public static getProvinceSelected() : IProvince {
        return this.province;
    }
}