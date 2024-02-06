import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-weekly-schedule-form-unrouted',
  templateUrl: './weekly-schedule-form-unrouted.component.html',
  styleUrls: ['./weekly-schedule-form-unrouted.component.css']
})
export class WeeklyScheduleFormUnroutedComponent implements OnInit {

  availableProducts: IRecipe[] | undefined;

  selectedProducts: IRecipe[] | undefined;

  draggedProduct: IRecipe | undefined | null;

  constructor(
    private oRecipeService: RecipeService,
    ) {
  }

  ngOnInit() {
    this.selectedProducts = [];
    this.availableProducts = []
  }

  dragStart(product: IRecipe) {
    this.draggedProduct = product;
  }

  drop() {
    if (this.draggedProduct) {
      let draggedProductIndex = this.findIndex(this.draggedProduct);
      this.selectedProducts = [...(this.selectedProducts as IRecipe[]), this.draggedProduct];
      this.availableProducts = this.availableProducts?.filter((val, i) => i != draggedProductIndex);
      this.draggedProduct = null;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  findIndex(product: IRecipe) {
    let index = -1;
    for (let i = 0; i < (this.availableProducts as IRecipe[]).length; i++) {
      if (product.id === (this.availableProducts as IRecipe[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
