import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage, ISchedulePrueba, IUser, IWeekly } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { WeeklyPrintService } from 'src/app/service/weekly-print.service';
import { WeeklyService } from 'src/app/service/weekly.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();


  oPage: IRecipePage | undefined;
  orderField: string = "id";
  orderDirection: string = "asc";
  oSessionUser: IUser | null = null;
  strUserName: string = "";

  oRecipe: IRecipe | null = null;
  oWeekly: IWeekly | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 5, page: 0, pageCount: 0 };
  oSchedules: ISchedulePrueba[] = [];


  constructor(
    private oRecipeService: RecipeService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oWeeklyService: WeeklyService,
    private oScheduleService: ScheduleService,
    private oWeeklyPrinterService: WeeklyPrintService,

  ) {
    this.strUserName = oSessionService.getUsername();
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: IUser) => {
        this.oSessionUser = oUser;
        this.oWeeklyService.getOneBetweenDates(this.getInitDate(), this.getEndDate(), this.oSessionUser?.id).subscribe({
          next: (weekly: IWeekly) => {
            this.oWeekly = weekly;
            this.oScheduleService.getArrayByWeekly(weekly.id).subscribe({
              next: (schedules: ISchedulePrueba[]) => {
                this.oSchedules = schedules;
              }
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

  }

  ngOnInit() {
    this.getPage();


  }

  getPage(): void {
    this.oRecipeService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField).subscribe({
      next: (data: IRecipePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  //Zona de prueba

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getInitDate(): string {
    const actualDate = new Date(Date.now());
    const diaSemana = actualDate.getDay();
    let inicioSemana = new Date(actualDate);
    const diasParaRestar = diaSemana === 0 ? 6 : diaSemana - 1;
    inicioSemana.setDate(actualDate.getDate() - diasParaRestar);

    return this.formatDate(inicioSemana);
  }

  getEndDate(): string {
    const actualDate = new Date(Date.now());
    const diaSemana = actualDate.getDay();
    let inicioSemana = new Date(actualDate);
    const diasParaRestar = diaSemana === 0 ? 6 : diaSemana - 1;
    inicioSemana.setDate(actualDate.getDate() - diasParaRestar);
    inicioSemana.setDate(inicioSemana.getDate() + 6);

    return this.formatDate(inicioSemana);
  }

  onPrintWeekly = (id_weekly: number) => {
    this.oWeeklyPrinterService.printWeekly(id_weekly);
  }

}
