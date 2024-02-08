import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecipe, IUser, formOperation } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserSelectionUnroutedComponent } from '../../user/user-selection-unrouted/user-selection-unrouted.component';
import { MediaService } from 'src/app/service/media.service';

@Component({
  selector: 'app-admin-recipe-form-unrouted',
  templateUrl: './admin-recipe-form-unrouted.component.html',
  styleUrls: ['./admin-recipe-form-unrouted.component.css']
})
export class AdminRecipeFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  recipeForm!: FormGroup;
  oRecipe: IRecipe = { recipe_image:'', id_user: {} } as IRecipe;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;
  oSelectedImageUrl: string | undefined = '';

  constructor(
    private oFormBuilder: FormBuilder,
    private oRecipeService: RecipeService,
    private oRouter: Router,
    public oDialogService: DialogService,
    private oMediaService: MediaService,
  ) { }

  initializeForm(oRecipe: IRecipe) {
    this.recipeForm = this.oFormBuilder.group({
      id: [oRecipe.id],
      id_user: this.oFormBuilder.group({
        id: [oRecipe.id_user?.id || null, Validators.required],
      }),
      name: [oRecipe.name, [Validators.required]],
      description: [oRecipe.description, [Validators.required]],
      process: [oRecipe.process, [Validators.required]],
      content: [oRecipe.content],
      recipe_image: [oRecipe.recipe_image]
    })
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oRecipeService.getOne(this.id).subscribe({
        next: (data: IRecipe) => {
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const oFormData = new FormData();
      oFormData.append('file', file);

      this.oMediaService.uploadFile(oFormData).subscribe({
        next: (response) => {
          this.oSelectedImageUrl = response.url;
          this.oRecipe.recipe_image = response.url;
          this.recipeForm.controls['recipe_image'].patchValue(response.url);
        },
        error: (error) => {
         console.log(error);
        }
       });
    }
  }
  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.operation == 'NEW') {
        this.oRecipeService.newOne(this.recipeForm.value).subscribe({
          next: (data: IRecipe) => {
            this.oRecipe = data;
            this.initializeForm(this.oRecipe);
            this.oRouter.navigate(['/admin', 'content', 'new', data]);
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

  edit() {
    if (this.recipeForm.valid) {
      this.oRecipeService.updateOne(this.recipeForm.value).subscribe({
        next: (data: IRecipe) => {
          this.oRecipe = data;
          this.initializeForm(this.oRecipe);
          this.oRouter.navigate(['/admin', 'recipe', 'detail', data.id]);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })

    }
  }

  quit() {
    this.oRecipeService.updateOne(this.recipeForm.value).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;
        this.initializeForm(this.oRecipe);
        this.oRouter.navigate(['/admin', 'content', 'remove', data.id]);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }


  onShowUsersSelection() {
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
