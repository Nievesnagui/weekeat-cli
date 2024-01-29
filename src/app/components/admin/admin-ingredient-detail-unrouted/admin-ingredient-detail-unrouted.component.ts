import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';
import { SessionService } from 'src/app/service/session.service';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-admin-ingredient-detail-unrouted',
  templateUrl: './admin-ingredient-detail-unrouted.component.html',
  styleUrls: ['./admin-ingredient-detail-unrouted.component.css']
})
export class AdminIngredientDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oIngredient: IIngredient = { id_type: {} } as IIngredient;
  status: HttpErrorResponse | null = null;

  constructor(
    private oIngredientService: IngredientService,
    private oSessionService: SessionService,
    private oTypeService: TypeService
  ) {
    
   }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oIngredientService.getOne(this.id).subscribe({    
      next: (data: IIngredient) => {
        console.log('Ingredient data: ', data);
        this.oIngredient = data;
  
        if (this.oIngredient && this.oIngredient.id_type) {
          console.log('oIngredient after assignment: ', this.oIngredient);
          console.log('oIngredient.id_type: ', this.oIngredient.id_type);
        } else {
          console.error('oIngredient or oIngredient.id_type is undefined.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
  

}
