import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { IRecipe, IUser } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recipe-detail-own-unrouted',
  templateUrl: './recipe-detail-own-unrouted.component.html',
  styleUrls: ['./recipe-detail-own-unrouted.component.css']
})
export class RecipeDetailOwnUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  strUserName: string = "";
  oSessionUser: IUser | null = null;


  oRecipe: IRecipe = { id_user: {} } as IRecipe;
  status: HttpErrorResponse | null = null;
  
  constructor(
    private oUserService: UserService,
    private oSessionService: SessionService,
    private oRecipeService: RecipeService,
  ) { 
    this.strUserName = oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

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
