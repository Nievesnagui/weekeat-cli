import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IType, ITypePage } from 'src/app/model/model.interface';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-admin-type-list-unrouted',
  templateUrl: './admin-type-list-unrouted.component.html',
  styleUrls: ['./admin-type-list-unrouted.component.css']
})
export class AdminTypeListUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: ITypePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oTypeToRemove: IType | null = null;

  constructor(
    private oTypeService: TypeService,
    private oConfirmationService: ConfirmationService,
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
    this.oTypeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: ITypePage) => {
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
  doRemove(u: IType) {
    this.oTypeToRemove = u;
  
    if (this.oTypeToRemove?.id !== undefined) {
      // Mostrar el modal de confirmación
      this.showConfirmationModal = true;
    } else {
      console.error('Type ID is undefined or null');
    }
  }
  
  confirmRemove() {
    // Lógica de eliminación aquí
    this.oTypeService.removeOne(this.oTypeToRemove?.id).subscribe({
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
    console.log('Type not removed');
    this.showConfirmationModal = false;
  }
  
}
