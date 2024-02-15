import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CALENDAR_ES } from 'src/app/environment/environment';
import { IUser, IWeekly, formOperation } from 'src/app/model/model.interface';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { WeeklyService } from 'src/app/service/weekly.service';

@Component({
  selector: 'app-weekly-new-unrouted',
  templateUrl: './weekly-new-unrouted.component.html',
  styleUrls: ['./weekly-new-unrouted.component.css']
})
export class WeeklyNewUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  es = CALENDAR_ES;

  weeklyForm!: FormGroup;
  oWeekly: IWeekly = { init_date: new Date(Date.now()), id_user: {} } as IWeekly;
  status: HttpErrorResponse | null = null;

  strUserName: string = "";
  oSessionUser: IUser | null = null;
  userId: number = 0;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private oFormBuilder: FormBuilder,
    private oWeeklyService: WeeklyService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router,
    public oDialogService: DialogService,
  ) { }

  initializeForm(oWeekly: IWeekly) {
    this.strUserName = this.oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
        this.userId = oUser.id;
        this.weeklyForm = this.oFormBuilder.group({
          id: [oWeekly.id],
          id_user: this.oFormBuilder.group({
            id: this.userId,
          }),
          init_date: [new Date(oWeekly.init_date), [Validators.required]]
        })
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oWeeklyService.getOne(this.id).subscribe({
        next: (data: IWeekly) => {
          this.oWeekly = data;
          this.initializeForm(this.oWeekly);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
    } else {
      this.initializeForm(this.oWeekly);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.weeklyForm.controls[controlName].hasError(errorName);
  }

  formatDate(date: Date): string {
    // Obtenemos la fecha en formato local (en la zona horaria del navegador)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    // Formamos la cadena de fecha en el formato requerido (YYYY-MM-DD)
    return `${year}-${month}-${day}`;
  }
  
  onSubmit() {
    let idRecipe: number = 0;
    if (this.weeklyForm.valid) {
      this.weeklyForm.value.init_date = this.formatDate(this.weeklyForm.value.init_date);

      if (this.operation == 'NEW') {
        this.oWeeklyService.newOne(this.weeklyForm.value).subscribe({
          next: (data: IWeekly) => {

            this.oWeekly = data;
            this.initializeForm(this.oWeekly);
            this.oRouter.navigate(['/weekly', 'schedule', 'new', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }

        });
      } else {
        this.oWeeklyService.updateOne(this.weeklyForm.value).subscribe({
          next: (data: IWeekly) => {
            this.oWeekly = data;
            this.initializeForm(this.oWeekly);

            this.oRouter.navigate(['/weekly', 'schedule', 'edit', data.id]);

          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        })
      }
    }
  }

  edit() {
    if (this.weeklyForm.valid) {
      this.weeklyForm.value.init_date = this.formatDate(this.weeklyForm.value.init_date);

      this.oWeeklyService.updateOne(this.weeklyForm.value).subscribe({
        next: (data: IWeekly) => {
          this.oWeekly = data;
          this.initializeForm(this.oWeekly);
          this.oRouter.navigate(['/weekly', 'list', 'own']);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
    }else {
      console.error('El formulario no es válido. No se puede realizar la actualización.');
    }
  }


}
