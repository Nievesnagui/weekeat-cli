import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { IType, ITypePage } from "../model/model.interface";
import { Observable } from "rxjs";

@Injectable()
export class TypeService{
    sUrl: string = API_URL + '/type';

    constructor(
        private oHttpClient: HttpClient
    ){}

    getOne(id: number): Observable<IType>{
        return this.oHttpClient.get<IType>(this.sUrl + '/' + id);
    }

    getByName(name: string): Observable<IType>{
        return this.oHttpClient.get<IType>(this.sUrl + '/byName' + name);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<ITypePage>{
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;  
        return this.oHttpClient.get<ITypePage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField );
    }

    removeOne(id: number | undefined): Observable<number>{
        if (id){
            return this.oHttpClient.delete<number>(this.sUrl + '/' + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oType: IType): Observable<IType>{
        return this.oHttpClient.post<IType>(this.sUrl, oType);
    }

    updateOne(oType: IType): Observable<IType>{
        return this.oHttpClient.put<IType>(this.sUrl, oType);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + '/empty');
    }
}