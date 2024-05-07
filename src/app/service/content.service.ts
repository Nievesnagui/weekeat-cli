import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IContent, IContentPage, IContentPrueba, IContentPruebaPage, IIngredient } from "../model/model.interface";


@Injectable()
export class ContentService {
    sUrl: string = API_URL + '/content';

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IContent> {
        return this.oHttpClient.get<IContent>(this.sUrl + '/' + id);
    }

    getOneForPrinting(id: number): Observable<IContentPrueba> {
        return this.oHttpClient.get<IContentPrueba>(this.sUrl + '/' + id);
    }

    getByName(name: string): Observable<IContent> {
        return this.oHttpClient.get<IContent>(this.sUrl + '/byName/' + name);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<IContentPage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IContentPage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField);
    }

    getPageByRecipe(size: number | undefined, page: number | undefined, orderField: string, id_recipe: number): Observable<IContentPruebaPage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IContentPruebaPage>(this.sUrl + '?size=' + size + '&page=' + page + '&sort=' + orderField + '&id_recipe=' + id_recipe);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oContent: IContent): Observable<IContent> {
        return this.oHttpClient.post<IContent>(this.sUrl, oContent);
    }

    updateOne(oContent: IContent): Observable<IContent> {
        return this.oHttpClient.put<IContent>(this.sUrl, oContent);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + '/empty');
    }


    /*  newOneForUsers(oContent: IContent): Observable<IContent> {
          return this.oHttpClient.post<IContent>(this.sUrl + "/forusers" + oContent);
      }*/

}