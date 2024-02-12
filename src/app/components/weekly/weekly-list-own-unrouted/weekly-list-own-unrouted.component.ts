import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { IRecipe, ISchedule, ISchedulePage, IUser, IWeekly, IWeeklyPage } from 'src/app/model/model.interface';
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
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  orderField: string = "id";
  oPage: IWeeklyPage | undefined;
  oWeekly: IWeekly | null = null;
  orderDirection: string = "asc";
  oSchedules: ISchedule[] = [];
  oRecipes: IRecipe[] = [];



  constructor(
    private oWeeklyService: WeeklyService,
    private oUserService: UserService,
    private oSessionService: SessionService,
    private oScheduleService: ScheduleService,
    private oRecipeService: RecipeService
  ) {
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe(user => {
      this.id_filter = user.id;
      this.getPageByUser(this.id_filter); // Llama a getPage con el ID del usuario
    });
  }

  getWeeklySchedules(weeklyId: number): void {
    this.oScheduleService.getPageByWeeklyArr(weeklyId)
      .subscribe({
        next: (schedules: ISchedulePage) => {
          this.oSchedules = schedules.content;
          console.log(this.oSchedules);

          this.oSchedules.forEach(schedule => {
            this.oRecipeService.getOne(schedule.id_recipe.id).subscribe({
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
    /* this.getPageByUser(this.id_filter);
     console.log(this.id_filter);
     console.log(this.id);
     if (this.id > 0) {
       console.log("nginit con iduser >0");
 
       this.getUser();
     }
     if (this.id_weekly > 0) {
       console.log(" nginit con idweekly >0");
 
       this.getWeekly();
     }*/
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
    this.oWeeklyService.getPageByUser(
      this.oPaginatorState.rows,
      this.oPaginatorState.page,
      this.orderField,
      userId
    ).subscribe({
      next: (data: IWeeklyPage) => {
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
}
