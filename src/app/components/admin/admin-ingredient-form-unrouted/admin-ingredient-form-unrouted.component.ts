import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IIngredient, formOperation } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-admin-ingredient-form-unrouted',
  templateUrl: './admin-ingredient-form-unrouted.component.html',
  styleUrls: ['./admin-ingredient-form-unrouted.component.css']
})
export class AdminIngredientFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; 

  ingredientForm!: FormGroup;
  oIngredient: IIngredient = {} as IIngredient;
  status: HttpErrorResponse | null = null;
  
  constructor(
    private oFormBuilder: FormBuilder,
    private oIngredientService: IngredientService,
    private oRouter: Router,
  ) { }

  initializeForm(oIngredient: IIngredient) {
    this.ingredientForm = this.oFormBuilder.group({
      id: [oIngredient.id],
      name: [oIngredient.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      content: [oIngredient.content, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oIngredientService.getOne(this.id).subscribe({
        next: (data: IIngredient) => {
          console.log('Ingredient data: ',data);
          this.oIngredient = data;
          this.initializeForm(this.oIngredient);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      this.initializeForm(this.oIngredient);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ingredientForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.ingredientForm.valid) {
      if (this.operation == 'NEW') {
        this.oIngredientService.newOne(this.ingredientForm.value).subscribe({
          next: (data: IIngredient) => {
            this.oIngredient = data;
            this.initializeForm(this.oIngredient);
            this.oRouter.navigate(['/admin', 'ingredient', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      } else {
        this.oIngredientService.updateOne(this.ingredientForm.value).subscribe({
          next: (data: IIngredient) => {
            this.oIngredient = data;
            this.initializeForm(this.oIngredient);
            this.oRouter.navigate(['/admin', 'ingredient', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
    }
  }

}
