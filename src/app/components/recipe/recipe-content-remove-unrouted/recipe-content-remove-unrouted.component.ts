import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IContent, IContentPage, IContentPruebaPage, IIngredient, IIngredientPage, IRecipe } from 'src/app/model/model.interface';
import { ContentService } from 'src/app/service/content.service';
import { IngredientService } from 'src/app/service/ingredient.service';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-content-remove-unrouted',
  templateUrl: './recipe-content-remove-unrouted.component.html',
  styleUrls: ['./recipe-content-remove-unrouted.component.css']
})
export class RecipeContentRemoveUnroutedComponent implements OnInit {


  @Input() id: number = 1;

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oContent: IContent = { id_ingredient: {}, id_recipe: {} } as IContent;

  oPage: IIngredientPage | undefined;
  oPageContent: IContentPage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 20, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oIngredientToRemove: IIngredient | null = null;

  sourceIngredients!: IIngredient[];
  targetIngredients: IIngredient[] = [];

  id_recipe: number = 0;

  recipe!: IRecipe;


  constructor(
    private oContentService: ContentService,
    private oRecipeService: RecipeService,
    private oIngredientService: IngredientService,
    public oDialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private oRouter: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id_recipe = +(params.get('id') || 0);

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
    this.oIngredientService.getPageByContentFilter(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.id_recipe).subscribe({
      next: (data: IIngredientPage) => {
        this.oPage = data;

        if (this.targetIngredients.length === 0) {
          this.targetIngredients = [];
        }

        this.sourceIngredients = data.content.filter(ingredient => ingredient.isInContent);

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
    this.oRecipeService.getOne(this.id_recipe).subscribe((recipe: IRecipe) => {
      this.recipe = recipe;

      this.oContentService.getPageByRecipe(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, recipe.id).subscribe({
        next: (data: IContentPruebaPage) => {

          this.targetIngredients.forEach(ig => {
            var content = data.content.find(cnt => cnt.ingredient.id === ig.id);
            this.oContentService.removeOne(content?.id).subscribe({
              next: () => {
                this.getPage();
                this.oRouter.navigate(['/recipe', recipe.id]);
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
              }
            });
          });

        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
         }
      })

    });

  }
}
