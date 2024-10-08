import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, formOperation } from 'src/app/model/model.interface';
import { MediaService } from 'src/app/service/media.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-user-form-unrouted',
  templateUrl: './admin-user-form-unrouted.component.html',
  styleUrls: ['./admin-user-form-unrouted.component.css']
})
export class AdminUserFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  userForm!: FormGroup;
  oUser: IUser = { profile_picture: '' } as IUser;
  status: HttpErrorResponse | null = null;
  oSelectedImageUrl: string | undefined = '';
  constructor(
    private oFormBuilder: FormBuilder,
    private oUserService: UserService,
    private oMediaService: MediaService,
    private oRouter: Router,
  ) { }

  initializeForm(oUser: IUser) {
    this.userForm = this.oFormBuilder.group({
      id: [oUser.id],
      username: [oUser.username, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      name: [oUser.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      surname: [oUser.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      profile_picture: [oUser.profile_picture],
      email: [oUser.email, [Validators.required, Validators.email]],
      phone: [oUser.phone, [Validators.required, Validators.pattern(/^[\d\-]+$/)]],
      role: [oUser.role, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oUserService.getOne(this.id).subscribe({
        next: (data: IUser) => {
          this.oUser = data;
          this.initializeForm(this.oUser);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      this.initializeForm(this.oUser);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const oFormData = new FormData();
      oFormData.append('file', file);

      this.oMediaService.uploadFile(oFormData).subscribe({
        next: (response) => {
          this.oSelectedImageUrl = response.url;
          this.oUser.profile_picture = response.url;
          this.userForm.controls['profile_picture'].patchValue(response.url);
        },
        error: (error) => {
         console.log(error);
        }
       });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.operation == 'NEW') {
        this.oUserService.newOne(this.userForm.value).subscribe({
          next: (data: IUser) => {
            this.oUser = data;
            this.initializeForm(this.oUser);
            this.oRouter.navigate(['/admin', 'user', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      } else {
        this.oUserService.updateOne(this.userForm.value).subscribe({
          next: (data: IUser) => {
            this.oUser = data;
            this.initializeForm(this.oUser);
            this.oRouter.navigate(['/admin', 'user', 'list']);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
    }
  }

}
