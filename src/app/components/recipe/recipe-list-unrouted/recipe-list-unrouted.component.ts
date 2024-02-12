import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IFavRecipe, IRecipe, IRecipePage, IUser } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { PaginatorState } from 'primeng/paginator';
import { FavouriteService } from 'src/app/service/favourite.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list-unrouted',
  templateUrl: './recipe-list-unrouted.component.html',
  styleUrls: ['./recipe-list-unrouted.component.css']
})
export class RecipeListUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  isFavorite: boolean = false;

  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";

  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 8, page: 0, pageCount: 0 };

  strUserName: string = "";
  oSessionUser: IUser = {} as IUser;
  userId: number = 0;

  id_recipe: number = 0;

  recipe!: IRecipe;


  constructor(
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router,
    private oFavouriteService: FavouriteService
  ) { }

  ngOnInit() {
    this.getPage();
    this.strUserName = this.oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
        this.userId = oUser.id;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  toggleFavorite(id_recipe: number): void {
    if (this.isFavorite) {
      // Si ya es favorito, eliminarlo de los favoritos
     /* this.oFavouriteService.removeOne(this.id_recipe).subscribe(() => {
        this.isFavorite = false;
      });*/
    } else {
      this.oRecipeService.getOne(id_recipe).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
        const id_recipe: IRecipe = {
          id: recipe.id,
          id_user: null,
          name: recipe.name,
          description: recipe.description,
          recipe_image: recipe.recipe_image,
          process: recipe.process,
          content: [],
          favs: [],
          schedules: [],
        };

        const id_user: IUser = {
          id: this.oSessionUser.id,
          username: this.oSessionUser.username,
          name: this.oSessionUser.name,
          surname: this.oSessionUser.surname,
          email: this.oSessionUser.email,
          phone: this.oSessionUser.phone,
          profile_picture: this.oSessionUser.profile_picture,
          password: this.oSessionUser.password,
          favs: [],
          weeks: [],
          recipes: [],
          role: this.oSessionUser.role,
        }


        const favRecipe: IFavRecipe = {
          id: 0,
          id_recipe: id_recipe,
          id_user: id_user
        };
        this.oFavouriteService.newOne(favRecipe).subscribe({
          next: (data: IFavRecipe) => {
            // Aquí asigna el resultado a una variable local en lugar de a oFavouriteService
            const favRecipeResult = data;
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      });
    }
  }


  getPage(): void {
    this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IRecipePage) => {
        this.oPage = data;
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
    this.getPage();
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

}
