import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IType, formOperation } from 'src/app/model/model.interface';
import { TypeService } from 'src/app/service/type.service';

@Component({
  selector: 'app-admin-type-form-unrouted',
  templateUrl: './admin-type-form-unrouted.component.html',
  styleUrls: ['./admin-type-form-unrouted.component.css']
})
export class AdminTypeFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  typeForm!: FormGroup;
  oType: IType = {} as IType;
  status: HttpErrorResponse | null = null;

  constructor(
    private oFormBuilder: FormBuilder,
    private oTypeService: TypeService,
    private oRouter: Router,
  ) { }

  initializeForm(oType: IType){
    this.typeForm = this. oFormBuilder.group({
      id: [oType.id],
      name: [oType.name, [Validators.required]],
    })
  }

  ngOnInit() {
    if(this.operation == 'EDIT'){
      this.oTypeService.getOne(this.id).subscribe({
        next: (data:IType) => {
          console.log('Type data: ', data);
          this.oType = data;
          this.initializeForm(this.oType);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      this.initializeForm(this.oType);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.typeForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.typeForm.valid) {
      if (this.operation == 'NEW') {
        this.oTypeService.newOne(this.typeForm.value).subscribe({
          next: (data: IType) => {
            this.oType = data;
            this.initializeForm(this.oType);
            this.oRouter.navigate(['/admin', 'type', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      } else {
        this.oTypeService.updateOne(this.typeForm.value).subscribe({
          next: (data: IType) => {
            this.oType = data;
            this.initializeForm(this.oType);
            this.oRouter.navigate(['/admin', 'type', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
    }
  }

}
