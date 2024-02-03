import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecipe, IUser, formOperation } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserSelectionUnroutedComponent } from '../../user/user-selection-unrouted/user-selection-unrouted.component';

@Component({
  selector: 'app-admin-recipe-form-unrouted',
  templateUrl: './admin-recipe-form-unrouted.component.html',
  styleUrls: ['./admin-recipe-form-unrouted.component.css']
})
export class AdminRecipeFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  recipeForm!: FormGroup;
  oRecipe: IRecipe= {id_user: {}} as IRecipe;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oRecipeService: RecipeService,
    private oRouter: Router,
    public oDialogService: DialogService,
  ) { }

  initializeForm(oRecipe: IRecipe){
    this.recipeForm = this.oFormBuilder.group({
    id: [oRecipe.id],
    id_user: this.oFormBuilder.group({
      id:[oRecipe.id_user?.id || null, Validators.required],
    }),
    name: [oRecipe.name, [Validators.required]],
    description: [oRecipe.description, [Validators.required]],
    content: [oRecipe.content]
    })
  }

  ngOnInit(){
    if(this.operation == 'EDIT'){
      this.oRecipeService.getOne(this.id).subscribe({
        next: (data:IRecipe) => {
          console.log('Type data: ', data);
          this.oRecipe = data;
          this.initializeForm(this.oRecipe);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      this.initializeForm(this.oRecipe);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.recipeForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.operation == 'NEW') {
        this.oRecipeService.newOne(this.recipeForm.value).subscribe({
          next: (data: IRecipe) => {
            this.oRecipe = data;
            this.initializeForm(this.oRecipe);
            this.oRouter.navigate(['/admin', 'content', 'new', data.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      } else {
        this.oRecipeService.updateOne(this.recipeForm.value).subscribe({
          next: (data: IRecipe) => {
            this.oRecipe = data;
            this.initializeForm(this.oRecipe);
            this.oRouter.navigate(['/admin', 'content', 'new', data.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
    }
  }

  onShowUsersSelection(){
    this.oDynamicDialogRef = this.oDialogService.open(UserSelectionUnroutedComponent, {
      header: 'Select an User',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oUser: IUser) => {
      if (oUser) {
        this.oRecipe.id_user = oUser;
        this.recipeForm.controls['id_user'].patchValue({ id: oUser.id })
      }
    });
  }
  
}
