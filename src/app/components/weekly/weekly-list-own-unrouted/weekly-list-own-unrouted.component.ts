import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { IRecipe, ISchedule, ISchedulePage, ISchedulePagePrueba, ISchedulePrueba, IUser, IWeekly, IWeeklyPage } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { WeeklyService } from 'src/app/service/weekly.service';

@Component({
  selector: 'app-weekly-list-own-unrouted',
  templateUrl: './weekly-list-own-unrouted.component.html',
  styleUrls: ['./weekly-list-own-unrouted.component.css']
})
export class WeeklyListOwnUnroutedComponent implements OnInit {

  @Input()
  set id(value: number) {
    if (value) {
      this.id_filter = value;
    } else {
      this.id_filter = 0;
    }
    this.getPageByUser(this.id_filter);
  }
  get id(): number {
    return this.id_filter;
  }

  @Input()
  set id_weekly(value: number) {
    if (value) {
      this.id_weekly_filter = value;
      this.getWeekly();
    } else {
      this.id_weekly_filter = 0;
    }
    this.getPageByUser(this.id_filter);
  }


  id_weekly_filter = 0;
  id_filter: number = 0;

  oUser: IUser | null = null;
  status: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 28, page: 0, pageCount: 0 };
  oPage: ISchedulePagePrueba | undefined;
  oWeekly: IWeekly | null = null;
  oWeeklyList: IWeekly[] = [];
  orderField: string = "id_weekly";
  orderDirection: string = "asc";
  oSchedules: ISchedulePrueba[] = [];
  oRecipes: IRecipe[] = [];

  showConfirmationModal = false;
  oWeeklyToRemove: IWeekly | null = null;

  constructor(
    private oWeeklyService: WeeklyService,
    private oUserService: UserService,
    private oSessionService: SessionService,
    private oScheduleService: ScheduleService,
    private oRecipeService: RecipeService,
    private oRouter: Router,

  ) {
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe(user => {
      this.id_filter = user.id;
      this.getPageByUser(this.id_filter);
    });
  }

  getWeeklySchedules(weeklyId: number): void {
    this.oSchedules = [];
    this.oScheduleService.getPageByWeeklyArr(weeklyId)
      .subscribe({
        next: (schedules: ISchedulePagePrueba) => {
          this.oSchedules = schedules.content;

          this.oRecipes = [];
          this.oSchedules.forEach(schedule => {
            this.oRecipeService.getOne(schedule.recipe.id).subscribe({
              next: (recipe: IRecipe) => {
                this.oRecipes.push(recipe);
              },
              error: (error: HttpErrorResponse) => {
                console.error(error);
              }
            });
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      });
  }

  ngOnInit() {
  }

  getOne(): void {
    this.oWeeklyService.getOne(this.id).subscribe({
      next: (data: IWeekly) => {
        this.oWeekly = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


  getUser(): void {
    this.oUserService.getOne(this.id).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  getPageByUser(userId: number): void {
    this.oSchedules = [];
    this.oWeeklyList= [];
    
    this.oScheduleService.getPageByUser(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      userId).subscribe({
        next: (data: ISchedulePagePrueba) => {

          data.content.forEach(s => {
            this.oSchedules.push(s);
            if (!this.oWeeklyList.some(w => w.id === s.weekly.id)) {
              this.oWeeklyList.push(s.weekly);
            }
          });
          
          this.oPage = data;

          this.oPaginatorState.pageCount = data.totalPages;
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      })
  }

  getValue(event: any): string {
    return event.target.value;
  }

  getWeekly(): void {
    this.oWeeklyService.getOne(this.id_weekly).subscribe({
      next: (data: IWeekly) => {
        this.oWeekly = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


  doRemove(u: IWeekly) {
    this.oWeeklyToRemove = u;

    if (this.oWeeklyToRemove?.id !== undefined) {
      // Mostrar el modal de confirmación
      this.showConfirmationModal = true;
      
    } else {
      console.error('Weekly ID is undefined or null');
    }
  }

  confirmRemove() {
    // Lógica de eliminación aquí

    this.oWeeklyService.removeOne(this.oWeeklyToRemove?.id).subscribe({
      next: () => {
        //this.getOne();
        this.getPageByUser(this.id_filter);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });


    // Cerrar el modal de confirmación después de confirmar
    this.showConfirmationModal = false;

  }

  cancelRemove() {
    // Cancelar la eliminación y cerrar el modal de confirmación
    this.showConfirmationModal = false;
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPageByUser(this.id_filter);
  }


}
