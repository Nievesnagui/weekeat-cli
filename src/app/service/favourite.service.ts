
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../environment/environment';
import { IFavRecipe, IIFavRecipePage } from '../model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
    sUrl: string = API_URL + '/fav_recipe';

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IFavRecipe>{
        return this.oHttpClient.get<IFavRecipe>(this.sUrl + '/' + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<IIFavRecipePage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IIFavRecipePage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oContent: IFavRecipe): Observable<IFavRecipe> {
        return this.oHttpClient.post<IFavRecipe>(this.sUrl, oContent);
    }

}
