import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage, IUser } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-recipe-list-own-unrouted',
  templateUrl: './recipe-list-own-unrouted.component.html',
  styleUrls: ['./recipe-list-own-unrouted.component.css']
})
export class RecipeListOwnUnroutedComponent implements OnInit {


  @Output() recipeDropped = new EventEmitter<CdkDragDrop<IRecipe[]>>();

  @Input()
  set id(value: number) {
    if (value) {
      this.id_filter = value;
    } else {
      this.id_filter = 0;
    }
    this.getPageByUser(this.id_filter);
  }
  get id(): number {
    return this.id_filter;
  }
  @Input()
  set id_recipe(value: number) {
    if (value) {
      this.id_recipe_filter = value;
      this.getRecipe();
    } else {
      this.id_recipe_filter = 0;
    }
    this.getPageByUser(this.id_filter);
  }

  @Output() recipe_change = new EventEmitter<Boolean>();

  id_recipe_filter: number = 0;
  id_filter: number = 0;

  oPage: IRecipePage | undefined;
  oUser: IUser | null = null;
  orderField: string = "id_recipe";
  orderDirection: string = "asc";

  oRecipe: IRecipe | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 8, page: 0, pageCount: 0 };

  constructor(
    private oRecipeService: RecipeService,
    private oUserService: UserService,
    public oSessionService: SessionService
  ) {
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe(user => {
      this.id_filter = user.id;
      this.getPageByUser(this.id_filter); // Llama a getPage con el ID del usuario
    });
  }

  ngOnInit() {

  }

  getPageByUser(userId: number): void {
    this.oRecipeService.getPageByUser(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      userId 
    ).subscribe({
      next: (data: IRecipePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }
  

  getValue(event: any): string {
    return event.target.value;
  }

  getRecipeImageUrl(recipeImage: string | null | undefined): string {
    if (recipeImage) {
      return `${recipeImage}`;
    } else {
      return 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=60';
    }
  }
  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPageByUser(this.id_filter);
  }


  getUser(): void {
    this.oUserService.getOne(this.id).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  getRecipe(): void {
    this.oRecipeService.getOne(this.id_recipe).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }
}
