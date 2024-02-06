import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/model/model.interface';
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
  status: HttpErrorResponse | null = null;

  constructor(
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService
  ) { }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.oRecipeService.getOne(this.id).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;

      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
