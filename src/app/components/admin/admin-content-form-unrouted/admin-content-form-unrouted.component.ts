import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { PickListFilterOptions } from 'primeng/picklist';
import { Subject } from 'rxjs';
import { IContent, IIngredient, IIngredientPage } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';
import { RecipeService } from 'src/app/service/recipe.service';

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
  oPaginatorState: PaginatorState = { first: 0, rows: 20, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oIngredientToRemove: IIngredient | null = null;

  sourceIngredients!: IIngredient[];
  targetIngredients: IIngredient[] = [];


  constructor(
   // private oContentService: ContentService,
    private oRecipeService: RecipeService,
    private oIngredientService: IngredientService,
    private oConfirmationService: ConfirmationService,
    public oDialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id_recipe = +(params.get('id') || 0);
      this.getPage();
    });
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

        if (this.targetIngredients.length === 0) {
          this.targetIngredients = [];
        }
        this.sourceIngredients = data.content.filter(ingredient => {
          const isInTarget = this.targetIngredients.some(target => target.id === ingredient.id);
          return !isInTarget;
        });

        this.cdr.markForCheck();
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;

    this.getPage();
  }

  onDrop(event: any) {
    this.targetIngredients.push(event.target);
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
    console.log("entra");
    this.targetIngredients.forEach(ingredient => {
      const ingredientName = ingredient.name;
      console.log(ingredient);
    });
  }


}
