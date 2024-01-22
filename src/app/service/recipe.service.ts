import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe, IRecipePage } from '../model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  sUrl: string = API_URL + "/recipe";


  constructor(
    private oHttpClient: HttpClient
  ) { }

  getOne(id: number): Observable<IRecipe> {
    console.log('RecipeService.getOne called');
    return this.oHttpClient.get<IRecipe>(this.sUrl + "/" + id);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_user: number, strFilter?: string): Observable<IRecipePage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
    let strUrlUser = "";
    if (id_user > 0) {
      strUrlUser = "&user=" + id_user;
    }
    if (strFilter && strFilter.trim().length > 0) {
      sUrl_filter = `&filter=${strFilter}`;
    } else {
      sUrl_filter = "";
    }
    return this.oHttpClient.get<IRecipePage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlUser + sUrl_filter);
  }

}
