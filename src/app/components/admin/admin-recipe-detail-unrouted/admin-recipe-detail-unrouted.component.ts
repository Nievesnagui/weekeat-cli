import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IContent, IIngredient, IIngredientPage, IRecipe } from 'src/app/model/model.interface';
import { ContentService } from 'src/app/service/content.service';
import { IngredientService } from 'src/app/service/ingredient.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-recipe-detail-unrouted',
  templateUrl: './admin-recipe-detail-unrouted.component.html',
  styleUrls: ['./admin-recipe-detail-unrouted.component.css']
})
export class AdminRecipeDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oRecipe: IRecipe = { id_user: {} } as IRecipe;
  oIngredients: IIngredient[] = [];
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 200, page: 0, pageCount: 0 };
  oPage: IIngredientPage | undefined;


  constructor(
    private oRecipeService: RecipeService,
    private oIngredientService: IngredientService
  ) { }

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

}
