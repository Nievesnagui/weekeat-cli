import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { PickListFilterOptions } from 'primeng/picklist';
import { Subject } from 'rxjs';
import { IContent, IIngredient, IIngredientPage } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-admin-content-form-unrouted',
  templateUrl: './admin-content-form-unrouted.component.html',
  styleUrls: ['./admin-content-form-unrouted.component.css']
})
export class AdminContentFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oContent: IContent = { id_ingredient: {}, id_recipe: {} } as IContent;

  oPage: IIngredientPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 2, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oIngredientToRemove: IIngredient | null = null;

  sourceIngredients!: IIngredient[];
  targetIngredients!: IIngredient[];


  constructor(
    private oIngredientService: IngredientService,
    private oConfirmationService: ConfirmationService,
    public oDialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getPage();

    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
          this.oIngredientService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
            next: (data: IIngredientPage) => {
              this.sourceIngredients = data.content;
              console.log(data);
              this.cdr.markForCheck();

              // Asigna el objeto a sourceIngredients
              this.targetIngredients = [];
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
            }
          });
        }
      }
    });
  }

  getPage(): void {
    this.oIngredientService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IIngredientPage) => {
        this.oPage = data;
        console.log(data);
        this.sourceIngredients = data.content;
        console.log(data);
        this.cdr.markForCheck();

        // Asigna el objeto a sourceIngredients
        this.targetIngredients = [];
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

  onSubmit() {

  }


}
