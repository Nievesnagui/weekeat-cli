import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IFavRecipe, IFavRecipePrueba, IIFavRecipePage, IIFavRecipePagePrueba, IRecipe, IUser } from 'src/app/model/model.interface';
import { FavouriteService } from 'src/app/service/favourite.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recipe-list-favs-unrouted',
  templateUrl: './recipe-list-favs-unrouted.component.html',
  styleUrls: ['./recipe-list-favs-unrouted.component.css']
})
export class RecipeListFavsUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  @Input()
  set id(value: number) {
    if (value) {
      this.id_filter = value;
    } else {
      this.id_filter = 0;
    }
    this.getPage(this.id_filter);
  }
  get id(): number {
    return this.id_filter;
  }

  @Input()
  set id_fav(value: number) {
    if (value) {
      this.id_fav_filter = value;
      this.getFav();
    } else {
      this.id_fav_filter = 0;
    }
    this.getPage(this.id_filter);
  }
  id_fav_filter: number = 0;
  id_filter: number = 0;
  oPage: IIFavRecipePagePrueba | undefined;
  orderDirection: string = "asc";

  oRecipe: IRecipe | null = null;
  oFavourite: IFavRecipePrueba | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 8, page: 0, pageCount: 0 };

  strUserName: string = "";
  oSessionUser: IUser = {} as IUser;
  userId: number = 0;

  id_recipe: number = 0;

  recipe!: IRecipe;
  filterValue: string = "";

  constructor(
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router,
    private oFavouriteService: FavouriteService
  ) {
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe(user => {
      this.id_filter = user.id;
      console.log(this.id_filter);
      this.getPage(this.id_filter); // Llama a getPage con el ID del usuario
    });
   }

  ngOnInit() {
  }

  search(): void {
    this.getPage(this.id_filter);
  }

  getPage(userId: number): void {
    this.oFavouriteService.getPageByUser(this.oPaginatorState.rows, this.oPaginatorState.page, userId).subscribe({
      next: (data: IIFavRecipePagePrueba) => {
        this.oPage = data;
        console.log(data);
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage(this.id_filter);
  }

  getValue(event: any): string {
    return event.target.value;
  }


  getRecipeImageUrl(recipeImage: string | null | undefined): string {
    if (recipeImage) {
      // Si hay una imagen en la base de datos, devuelve la URL de esa imagen
      return `${recipeImage}`;
    } else {
      // Si no hay imagen en la base de datos, devuelve la URL predeterminada
      return 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60';
    }
  }

  getFav(): void {
    this.oFavouriteService.getOne(this.id_fav_filter).subscribe({
      next: (data: IFavRecipePrueba) => {
        this.oFavourite = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


}
