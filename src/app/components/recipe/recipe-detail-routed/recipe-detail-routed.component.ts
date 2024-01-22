import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-detail-unrouted',
  templateUrl: './recipe-detail-routed.component.html',
  styleUrls: ['./recipe-detail-routed.component.css']
})
export class RecipeDetailRoutedComponent implements OnInit {

  @Input() id: number = 1;
  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;

  constructor(
    private oRecipeService: RecipeService
  ) { }

  ngOnInit() {
    console.log('ngonInit');
    this.getOne();
  }

  getOne(): void {
    console.log('Before HTTP request');
    this.oRecipeService.getOne(this.id).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;
        console.log(this.id);
        console.log(this.oRecipe.id);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

}
