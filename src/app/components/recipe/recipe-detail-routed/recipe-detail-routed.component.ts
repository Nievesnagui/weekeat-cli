import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-detail-unrouted',
  templateUrl: './recipe-detail-routed.component.html',
  styleUrls: ['./recipe-detail-routed.component.css']
})
export class RecipeDetailRoutedComponent implements OnInit {

  @Input() id: number = 1;
  oRecipe: IRecipe = {} as IRecipe;
  status: HttpErrorResponse | null = null;

  constructor(private oRecipeService: RecipeService) { }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }

  getOne(): void {
    console.log('Before HTTP request');
    console.log('Recipe ID:', this.id);

    if (this.id) {
      this.oRecipeService.getOne(this.id).subscribe({
        next: (data: IRecipe) => {
          this.oRecipe = data;
          console.log(data.id);
          console.log(this.id);
          console.log("Recipe: "+data.id);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
    } else {
      console.error('Recipe ID is not provided.');
    }
  }

}
