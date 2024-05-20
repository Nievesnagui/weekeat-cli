import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IFavRecipe, IFavRecipePrueba, IIFavRecipePagePrueba, IRecipe, IRecipePage, IUser } from 'src/app/model/model.interface';
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

  isFavorite: boolean = false;
  oPageFavs: IIFavRecipePagePrueba | undefined;

  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  favProducts: IRecipe[] = [];

  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 8, page: 0, pageCount: 0 };
  oPaginatorStateFav: PaginatorState = { first: 0, rows: 20, page: 0, pageCount: 0 };
  oFavourite: IFavRecipePrueba | null = null;

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
      this.getPage(this.id_filter);
    });

  }//

  ngOnInit() {
    this.getPage(this.id_filter);
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
          this.getPage(this.id_filter);
        }
      }
    });
  }
  search(): void {
    this.getPage(this.id_filter);
  }

  toggleFavorite(id_recipe: number): void {


    this.oFavouriteService.getByUserAndRecipe(this.oSessionUser.id, id_recipe).subscribe({
      next: (fav: IIFavRecipePagePrueba) => {

        if (!fav.empty) {
          // Si ya es favorito, eliminarlo de los favoritos
          const recipeIndex = this.favProducts.findIndex(recipe => recipe.id === fav.content[0].recipe.id);
          if (recipeIndex !== -1) {
            this.favProducts.splice(recipeIndex, 1);
          }
          this.oFavouriteService.removeOne(fav.content[0].id).subscribe({
            next: () => {
              this.getFav();
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
            }
          });

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
                const favRecipeResult = data;
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
              }
            })

            this.favProducts.push(id_recipe);

          });
        }


      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

    this.getPage(this.id_filter);


  }

  /*deleteFavorite(id_recipe: number): void {
 
      // Si ya es favorito, eliminarlo de los favoritos
      this.oFavouriteService.removeOne(this.id_recipe).subscribe(() => {
        this.isFavorite = false;
      });
    }
  }*/



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

  getPage(userId: number): void {
    this.oFavouriteService.getPageByUser(this.oPaginatorStateFav.rows, this.oPaginatorStateFav.page, userId).subscribe({
      next: (data: IIFavRecipePagePrueba) => {
        this.oPageFavs = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.favProducts = data.content.map(favRecipe => ({
          id: favRecipe.recipe.id,
          name: favRecipe.recipe.name,
          description: favRecipe.recipe.description,
          recipe_image: favRecipe.recipe.recipe_image,
          // Asignar los valores restantes como se desee o como se obtengan
          id_user: null, // Por ejemplo, si no está disponible en IFavRecipePrueba
          process: favRecipe.recipe.process,
          content: [], // Por ejemplo, si no está disponible en IFavRecipePrueba
          favs: [], // Por ejemplo, si no está disponible en IFavRecipePrueba
          schedules: [], // Por ejemplo, si no está disponible en IFavRecipePrueba
          isFavorite: false
        }));
        this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.filterValue).subscribe({
          next: (data: IRecipePage) => {
            this.oPage = data;
            this.oPaginatorState.pageCount = data.totalPages;
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        });

      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

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

  isRecipeFavorite(recipeId: number): boolean {
    return this.favProducts.some(recipe => recipe.id === recipeId);
  }

}
