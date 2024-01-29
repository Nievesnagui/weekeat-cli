import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IType, ITypePage } from 'src/app/model/model.interface';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-type-selection-unrouted',
  templateUrl: './type-selection-unrouted.component.html',
  styleUrls: ['./type-selection-unrouted.component.css']
})
export class TypeSelectionUnroutedComponent implements OnInit {

  oPage: ITypePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;

  constructor(
    private oTypeService: TypeService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
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

  onSelectType(oType: IType) {
    this.oDynamicDialogRef.close(oType);
  }

}
