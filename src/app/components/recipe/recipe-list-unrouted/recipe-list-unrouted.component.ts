import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-recipe-list-unrouted',
  templateUrl: './recipe-list-unrouted.component.html',
  styleUrls: ['./recipe-list-unrouted.component.css']
})
export class RecipeListUnroutedComponent implements OnInit {
  
  @Input() forceReload: Subject<boolean> = new Subject<boolean>();


  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";

  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };


  constructor(
    private oRecipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.getPage();
   
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IRecipePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  getValue(event: any): string {
    return event.target.value;
  }

  getRecipeImageUrl(recipeImage: string | null | undefined): string {
    if (recipeImage) {
      // Si hay una imagen en la base de datos, devuelve la URL de esa imagen
      return `URL_DE_TU_API_PARA_OBTENER_IMAGEN/${recipeImage}`;
    } else {
      // Si no hay imagen en la base de datos, devuelve la URL predeterminada
      return 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60';
    }
  }

}
