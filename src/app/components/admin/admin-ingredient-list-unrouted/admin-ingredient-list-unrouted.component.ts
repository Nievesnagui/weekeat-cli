import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IIngredient, IIngredientPage } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-admin-ingredient-list-unrouted',
  templateUrl: './admin-ingredient-list-unrouted.component.html',
  styleUrls: ['./admin-ingredient-list-unrouted.component.css']
})
export class AdminIngredientListUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IIngredientPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oIngredientToRemove: IIngredient | null = null;
  
  constructor(
    private oIngredientService: IngredientService,
    public oDialogService: DialogService
  ) { }

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
    this.oIngredientService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IIngredientPage) => {
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
/*
  doView(u: IIngredient) {
    this.ref = this.oDialogService.open(AdminIngredientDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of ingredient',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }
*/

showConfirmationModal = false;

doRemove(u: IIngredient) {
  this.oIngredientToRemove = u;

  if (this.oIngredientToRemove?.id !== undefined) {
    // Mostrar el modal de confirmación
    this.showConfirmationModal = true;
  } else {
    console.error('Ingredient ID is undefined or null');
  }
}

confirmRemove() {
  // Lógica de eliminación aquí
  this.oIngredientService.removeOne(this.oIngredientToRemove?.id).subscribe({
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
  console.log('Ingredient not removed');
  this.showConfirmationModal = false;
}

}
