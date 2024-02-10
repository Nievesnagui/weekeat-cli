import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage, IUser } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {
  
  @Input() forceReload: Subject<boolean> = new Subject<boolean>();


  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oSessionUser: IUser | null = null;
  strUserName: string = "";

  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 5, page: 0, pageCount: 0 }; // Cambiado el número de filas a 5

  constructor(
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService
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
    this.getPage();
  }

  getPage(): void {
    this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IRecipePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

}
