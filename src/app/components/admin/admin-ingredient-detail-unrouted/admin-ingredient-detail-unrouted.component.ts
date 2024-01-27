import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-admin-ingredient-detail-unrouted',
  templateUrl: './admin-ingredient-detail-unrouted.component.html',
  styleUrls: ['./admin-ingredient-detail-unrouted.component.css']
})
export class AdminIngredientDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oIngredient: IIngredient = {} as IIngredient;
  status: HttpErrorResponse | null = null;

  constructor(
    private oIngredientService: IngredientService,
    private oSessionService: SessionService
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oIngredientService.getOne(this.id).subscribe({    
      next: (data: IIngredient) => {
        this.oIngredient = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
