import { Injectable } from "@angular/core";
import { API_URL } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { IIngredient, IIngredientPage } from "../model/model.interface";
import { Observable } from "rxjs";

@Injectable()
export class IngredientService {


    sUrl: string = API_URL + "/ingredient";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IIngredient> {
        return this.oHttpClient.get<IIngredient>(this.sUrl + "/" + id);
    }

    getByName(name: string): Observable<IIngredient> {
        return this.oHttpClient.get<IIngredient>(this.sUrl + "/byName/" + name);
    }


    getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<IIngredientPage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IIngredientPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField);
    }

    getPageByType(size: number | undefined, page: number | undefined, orderField: string, id_type: number){
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IIngredientPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "&id_type=" + id_type);
    }
    getPageByContentFilter(size: number | undefined, page: number | undefined, orderField: string, id_recipe: number): Observable<IIngredientPage> {
        let sUrl_filter: string;
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IIngredientPage>(this.sUrl + "/byContentFilter" + "?size=" + size + "&page=" + page + "&sort=" + orderField + "&id_recipe=" + id_recipe);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oIngredient: IIngredient): Observable<IIngredient> {
        return this.oHttpClient.post<IIngredient>(this.sUrl, oIngredient);
    }

    newOneForUsers(oIngredient: IIngredient): Observable<IIngredient> {
        return this.oHttpClient.post<IIngredient>(this.sUrl + "/forusers", oIngredient);
    }

    updateOne(oIngredient: IIngredient): Observable<IIngredient> {
        return this.oHttpClient.put<IIngredient>(this.sUrl, oIngredient);
    }
    /*
      generateRandom(amount: number): Observable<number> {
          return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
      }
    
      getPageByRepliesNumberDesc(size: number | undefined, page: number | undefined): Observable<IIngredientPage> {
          if (!size) size = 10;
          if (!page) page = 0;
          return this.oHttpClient.get<IIngredientPage>(this.sUrl + "/byRepliesNumberDesc?size=" + size + "&page=" + page);
      }
    */
    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }



}
