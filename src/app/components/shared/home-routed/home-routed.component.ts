import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {
  recipes: IRecipe[] | undefined;

  //responsiveOptions: any[];

  constructor(
    private oRecipeService: RecipeService,
  ) { }


  currentSlide = 0;
  ngOnInit() {
/*
    this.oRecipeService.getProductsSmall().then((products) => {
      this.products = products;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }

*/

  }


}
