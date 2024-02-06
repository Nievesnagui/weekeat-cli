import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IIngredient, IType, formOperation } from 'src/app/model/model.interface';
import { IngredientService } from 'src/app/service/ingredient.service';
import { TypeSelectionUnroutedComponent } from '../../type/type-selection-unrouted/type-selection-unrouted.component';
import { MediaService } from 'src/app/service/media.service';

@Component({
  selector: 'app-admin-ingredient-form-unrouted',
  templateUrl: './admin-ingredient-form-unrouted.component.html',
  styleUrls: ['./admin-ingredient-form-unrouted.component.css']
})
export class AdminIngredientFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; 

  ingredientForm!: FormGroup;
  oIngredient: IIngredient = { id_type: {}} as IIngredient;
  status: HttpErrorResponse | null = null;
  oSelectedImageUrl: string | undefined = '';


  oDynamicDialogRef: DynamicDialogRef | undefined;
  
  constructor(
    private oFormBuilder: FormBuilder,
    private oIngredientService: IngredientService,
    private oRouter: Router,
    public oDialogService: DialogService,
    private oMediaService: MediaService,
  ) { }

  initializeForm(oIngredient: IIngredient) {
    this.ingredientForm = this.oFormBuilder.group({
      id: [oIngredient.id],
      name: [oIngredient.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      id_type: this.oFormBuilder.group({
        id: [oIngredient.id_type?.id || null, Validators.required]
      }),
      ingredient_image: [oIngredient.ingredient_image]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oIngredientService.getOne(this.id).subscribe({
        next: (data: IIngredient) => {
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const oFormData = new FormData();
      oFormData.append('file', file);

      this.oMediaService.uploadFile(oFormData).subscribe({
        next: (response) => {
          this.oSelectedImageUrl = response.url;
          this.oIngredient.ingredient_image = response.url;
          this.ingredientForm.controls['ingredient_image'].patchValue(response.url);
        },
        error: (error) => {
         console.log(error);
        }
       });
    }
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
        const id_type = this.oIngredient.id_type ? this.oIngredient.id_type.id : null;

        // Handle oIngredient.id_type being undefined
        this.ingredientForm.get('id_type')?.patchValue({ id_type: id_type });
  
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

  onShowTypesSelection(){
    this.oDynamicDialogRef = this.oDialogService.open(TypeSelectionUnroutedComponent, {
      header: 'Select a Type',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oType: IType) => {
      if (oType) {
        this.oIngredient.id_type = oType;
        this.ingredientForm.controls['id_type'].patchValue({ id: oType.id })
      }
    });
  }

}
