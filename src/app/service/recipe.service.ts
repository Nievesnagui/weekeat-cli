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
    return this.oHttpClient.get<IRecipe>(this.sUrl + "/" + id);
  }

  getByName(name: string): Observable<IRecipe> {
    return this.oHttpClient.get<IRecipe>(this.sUrl + "/byName/" + name);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string): Observable<IRecipePage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
 
    return this.oHttpClient.get<IRecipePage>(this.sUrl + "?size=" + size + "&page=" + page);
  }

  removeOne(id: number | undefined): Observable<number> {
    if (id) {
      return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
    } else {
      return new Observable<number>();
    }
  }

  newOne(oRecipe: IRecipe): Observable<IRecipe> {
    return this.oHttpClient.post<IRecipe>(this.sUrl, oRecipe);
  }

  newOneForUsers(oRecipe: IRecipe): Observable<IRecipe> {
    return this.oHttpClient.post<IRecipe>(this.sUrl + "/forusers", oRecipe);
  }

  updateOne(oRecipe: IRecipe): Observable<IRecipe> {
    return this.oHttpClient.put<IRecipe>(this.sUrl, oRecipe);
  }

  empty(): Observable<number> {
    return this.oHttpClient.delete<number>(this.sUrl + "/empty");
  }


}
