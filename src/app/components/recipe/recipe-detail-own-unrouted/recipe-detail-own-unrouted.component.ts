import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-detail-own-unrouted',
  templateUrl: './recipe-detail-own-unrouted.component.html',
  styleUrls: ['./recipe-detail-own-unrouted.component.css']
})
export class RecipeDetailOwnUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oRecipe: IRecipe = { id_user: {} } as IRecipe;
  status: HttpErrorResponse | null = null;
  
  constructor(
    private oRecipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oRecipeService.getOne(this.id).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;

        if (this.oRecipe && this.oRecipe.id_user) {
          console.log('oRecipe after assignment: ', this.oRecipe);
          console.log('oRecipe.id_user: ', this.oRecipe.id_user);
        } else {
          console.error('oIngredient or oRecipe.id_user is undefined.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
