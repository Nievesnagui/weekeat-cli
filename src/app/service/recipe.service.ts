import { Injectable } from '@angular/core';
import { API_URL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { IRecipe, IRecipePage } from '../model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  sUrl: string = API_URL + "/recipe";


  constructor(
    private oHttpClient: HttpClient
  ) { }
  getAllRecipes(): Observable<IRecipe[]> {
    return this.oHttpClient.get<IRecipe[]>(this.sUrl).pipe(
      catchError(error => {
        console.error('Error al obtener las recetas:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  getOne(id: number): Observable<IRecipe> {
    return this.oHttpClient.get<IRecipe>(this.sUrl + "/" + id);
  }

  getByName(name: string): Observable<IRecipe> {
    return this.oHttpClient.get<IRecipe>(this.sUrl + "/byName/" + name);
  }

  getPage(size: number | undefined, page: number | undefined, orderField: string, strFilter?: string): Observable<IRecipePage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
    if (strFilter && strFilter.trim().length > 0) {
      sUrl_filter = `&filter=${strFilter}`;
  } else {
      sUrl_filter = "";
  }
    return this.oHttpClient.get<IRecipePage>(this.sUrl + "?size=" + size + "&page=" + page + sUrl_filter);
  }
  getPageByUser(size: number | undefined, page: number | undefined, orderField: string, userId:number|undefined): Observable<IRecipePage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
 
    return this.oHttpClient.get<IRecipePage>(this.sUrl + "?size=" + size + "&page=" + page+ "&id_user=" + userId);
  }

  getPageByContentFilter(size: number | undefined, page: number | undefined, orderField: string, id_ingredient: number): Observable<IRecipePage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
    return this.oHttpClient.get<IRecipePage>(this.sUrl + "/byContentFilter" + "?size=" + size + "&page=" + page + "&sort=" + orderField + "&id_ingredient=" + id_ingredient);
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

  //Prueba para coger la receta
  private createdRecipeSubject = new BehaviorSubject<number>(0);
  createdRecipe$ = this.createdRecipeSubject.asObservable();

  setCreatedRecipe(recipeId: number) {
    this.createdRecipeSubject.next(recipeId);
  }


}
