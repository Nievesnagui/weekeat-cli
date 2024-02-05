import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecipe, IUser, formOperation } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserSelectionUnroutedComponent } from '../../user/user-selection-unrouted/user-selection-unrouted.component';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-recipe-form-unrouted',
  templateUrl: './recipe-form-unrouted.component.html',
  styleUrls: ['./recipe-form-unrouted.component.css']
})
export class RecipeFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';


  recipeForm!: FormGroup;
  oRecipe: IRecipe = { id_user: {} } as IRecipe;
  status: HttpErrorResponse | null = null;

  strUserName: string = "";
  oSessionUser: IUser | null = null;
  userId: number = 0;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router,
    public oDialogService: DialogService,
  ) {




  }

  initializeForm(oRecipe: IRecipe) {
    console.log("initialize");
    this.strUserName = this.oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
        this.userId = oUser.id;
        this.recipeForm = this.oFormBuilder.group({
          id: [oRecipe.id],
          id_user: this.oFormBuilder.group({
            id: this.userId,
          }),
          name: [oRecipe.name, [Validators.required]],
          description: [oRecipe.description, [Validators.required]],
          content: [oRecipe.content]
        })
        console.log(this.userId);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oRecipeService.getOne(this.id).subscribe({
        next: (data: IRecipe) => {
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
    let idRecipe: number = 0;
    if (this.recipeForm.valid) {
      if (this.operation == 'NEW') {
        this.oRecipeService.newOne(this.recipeForm.value).subscribe({
          next: (data: IRecipe) => {
            
            this.oRecipe = data;
            this.initializeForm(this.oRecipe);
            this.oRouter.navigate(['/recipe', 'content', 'new', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
          
        });
      } else {
        this.oRecipeService.updateOne(this.recipeForm.value).subscribe({
          next: (data: IRecipe) => {
            this.oRecipe = data;
            this.initializeForm(this.oRecipe);
            console.log("Id de data: "+data.id);

            this.oRouter.navigate(['/recipe', 'content', 'new', data.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
     


    }
  }

  quit() {
    this.oRecipeService.updateOne(this.recipeForm.value).subscribe({
      next: (data: IRecipe) => {
        this.oRecipe = data;
        this.initializeForm(this.oRecipe);
        this.oRouter.navigate(['/recipe', 'content', 'remove', data.id]);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }


}
