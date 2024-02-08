import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-admin-recipe-list-unrouted',
  templateUrl: './admin-recipe-list-unrouted.component.html',
  styleUrls: ['./admin-recipe-list-unrouted.component.css']
})
export class AdminRecipeListUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oRecipeToRemove: IRecipe | null = null;
  id_user: number = 0;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRecipeService: RecipeService,
    public oDialogService: DialogService
  ) {
    this.id_user = parseInt(this.oActivatedRoute.snapshot.params['id_user'] ?? "0");
  }

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {

    if (this.id_user > 0) {
      this.getPageByUser(this.id_user);
    } else {
      this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
        next: (data: IRecipePage) => {
          console.log(data);
          this.oPage = data;
          this.oPaginatorState.pageCount = data.totalPages;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    }
  }

  getPageByUser(userId: number): void {
    this.oRecipeService.getPageByUser(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      userId // Agrega el ID del usuario como filtro
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

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;
  showConfirmationModal = false;
  doRemove(u: IRecipe) {
    this.oRecipeToRemove = u;
    console.log('Recipe to remove:', this.oRecipeToRemove);

    if (this.oRecipeToRemove?.id !== undefined) {
      // Mostrar el modal de confirmación
      this.showConfirmationModal = true;
    } else {
      console.error('Recipe ID is undefined or null');
    }
  }

  confirmRemove() {
    // Lógica de eliminación aquí
    console.log('Removing recipe');
    this.oRecipeService.removeOne(this.oRecipeToRemove?.id).subscribe({
      next: () => {
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

    // Cerrar el modal de confirmación después de confirmar
    this.showConfirmationModal = false;
  }

  cancelRemove() {
    // Cancelar la eliminación y cerrar el modal de confirmación
    console.log('Recipe not removed');
    this.showConfirmationModal = false;
  }


}
