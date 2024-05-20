import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IContent, IIngredient, IIngredientPage, IRecipe, IUser } from 'src/app/model/model.interface';
import { ContentService } from 'src/app/service/content.service';
import { IngredientService } from 'src/app/service/ingredient.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recipe-detail-own-unrouted',
  templateUrl: './recipe-detail-own-unrouted.component.html',
  styleUrls: ['./recipe-detail-own-unrouted.component.css']
})
export class RecipeDetailOwnUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  strUserName: string = "";
  oSessionUser: IUser | null = null;
  oRecipeToRemove: IRecipe | null = null;


  oPage: IIngredientPage | undefined;
  oRecipe: IRecipe = { id_user: {} } as IRecipe;
  status: HttpErrorResponse | null = null;
  oIngredients: IIngredient[] = [];

  oPaginatorState: PaginatorState = { first: 0, rows: 200, page: 0, pageCount: 0 };

  constructor(
    private oUserService: UserService,
    private oSessionService: SessionService,
    private oRecipeService: RecipeService,
    private oContentService: ContentService,
    private oIngredientService: IngredientService
  ) {
    this.strUserName = oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oRecipeService.getOne(this.id).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;
        this.oIngredientService.getPageByContentFilter(this.oPaginatorState.rows, this.oPaginatorState.page, "id", this.oRecipe.id).subscribe({
          next: (data: IIngredientPage) => {
            this.oPage = data;
            this.oIngredients = data.content.filter(ingredient => ingredient.isInContent);
        


          }, error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


  ref: DynamicDialogRef | undefined;
  showConfirmationModal = false;
  doRemove(u: IRecipe) {
    this.oRecipeToRemove = u;
    if (this.oRecipeToRemove?.id !== undefined) {
      // Mostrar el modal de confirmación
      this.showConfirmationModal = true;
    } else {
      console.error('Recipe ID is undefined or null');
    }
  }

  confirmRemove() {
    // Lógica de eliminación aquí
    this.oRecipeService.removeOne(this.oRecipeToRemove?.id).subscribe({
      next: () => {
        this.getOne();

      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

    // Cerrar el modal de confirmación después de confirmar
    this.showConfirmationModal = false;
  }

  cancelRemove() {
    // Cancelar la eliminación y cerrar el modal de confirmación
    console.log('Recipe not removed');
    this.showConfirmationModal = false;
  }

}
