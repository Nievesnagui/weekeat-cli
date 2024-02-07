import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-weekly-schedule-form-unrouted',
  templateUrl: './weekly-schedule-form-unrouted.component.html',
  styleUrls: ['./weekly-schedule-form-unrouted.component.css']
})
export class WeeklyScheduleFormUnroutedComponent implements OnInit {

  availableProducts: IRecipe[] = [];

  selectedProducts: IRecipe[] = [];

  draggedProduct: IRecipe | undefined | null;

  constructor(
    private oRecipeService: RecipeService,
    ) {
  }

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.oRecipeService.getAllRecipes().subscribe({
      next: (response: any) => {
        console.log("Recipe");
        console.log(response);
  
        // Verificar si la respuesta contiene una propiedad 'content' que es un array
        if (response && response.content && Array.isArray(response.content)) {
          // Asignar el array de recetas a availableProducts
          this.availableProducts = response.content;
        } else {
          console.error('La respuesta del servicio no contiene un array de recetas válido:', response);
        }
      },
      error: (error: any) => {
        console.error('Error al obtener las recetas:', error);
      }
    });
  }

  dragStart(product: IRecipe) {
    this.draggedProduct = product;
  }

  drop() {
    if (this.draggedProduct) {
      this.selectedProducts.push(this.draggedProduct);
      this.availableProducts = this.availableProducts.filter(product => product.id !== this.draggedProduct!.id);
      this.draggedProduct = null;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }


}
