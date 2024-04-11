import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Observable, Subject, Subscriber, lastValueFrom } from 'rxjs';
import { IFavRecipePrueba, IIFavRecipePagePrueba, IRecipe, ISchedule, ISchedulePagePrueba, ISchedulePrueba, IUser, IWeekly, formOperation } from 'src/app/model/model.interface';
import { FavouriteService } from 'src/app/service/favourite.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { WeeklyService } from 'src/app/service/weekly.service';


@Component({
  selector: 'app-weekly-schedule-form-unrouted',
  templateUrl: './weekly-schedule-form-unrouted.component.html',
  styleUrls: ['./weekly-schedule-form-unrouted.component.css']
})
export class WeeklyScheduleFormUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  @Input() operation: formOperation = 'NEW';


  @Input()
  set id(value: number) {
    if (value) {
      this.id_filter = value;
    } else {
      this.id_filter = 0;
    }
    this.loadRecipes(this.id_filter);
  }
  get id(): number {
    return this.id_filter;
  }

  @Input()
  set id_fav(value: number) {
    if (value) {
      this.id_fav_filter = value;
      this.getFav();
    } else {
      this.id_fav_filter = 0;
    }
    this.loadRecipes(this.id_filter);
  }

  oPaginatorState: PaginatorState = { first: 0, rows: 100, page: 0, pageCount: 0 };
  oFavourite: IFavRecipePrueba | null = null;
  availableProducts: IRecipe[] = [];
  status: HttpErrorResponse | null = null;
  oSchedule: ISchedule = { id_weekly: {}, id_recipe: {} } as ISchedule;
  oWeekly: IWeekly = { id_user: {} } as IWeekly;

  strUserName: string = "";
  oSessionUser: IUser = {} as IUser;
  userId: number = 0;
  oPage: IIFavRecipePagePrueba | undefined;

  selectedMondayLunch: IRecipe | undefined | null;
  selectedMondayDinner: IRecipe | undefined | null;
  selectedTuesdayLunch: IRecipe | undefined | null;
  selectedTuesdayDinner: IRecipe | undefined | null;
  selectedWednesdayLunch: IRecipe | undefined | null;
  selectedWednesdayDinner: IRecipe | undefined | null;
  selectedThursdayLunch: IRecipe | undefined | null;
  selectedThursdayDinner: IRecipe | undefined | null;
  selectedFridayLunch: IRecipe | undefined | null;
  selectedFridayDinner: IRecipe | undefined | null;
  selectedSaturdayLunch: IRecipe | undefined | null;
  selectedSaturdayDinner: IRecipe | undefined | null;
  selectedSundayLunch: IRecipe | undefined | null;
  selectedSundayDinner: IRecipe | undefined | null;


  draggedProduct: IRecipe | undefined | null;
  id_fav_filter: number = 0;
  id_filter: number = 0;
  id_weekly: number = 0;
  id_recipe: number = 0;
  recipe!: IRecipe;
  filterValue: string = "";
  weekly!: IWeekly;
  oSchedules: ISchedulePrueba[] = [];
  oSchedules$: Observable<any> | undefined;

  oRecipes: IRecipe[] = [];


  constructor(
    private oRecipeService: RecipeService,
    private oWeeklyService: WeeklyService,
    private oFavouriteService: FavouriteService,
    private oSessionService: SessionService,
    private oUserService: UserService,
    private oRouter: Router,
    private oScheduleService: ScheduleService,
    private route: ActivatedRoute
  ) {
    this.oUserService.getByUsername(this.oSessionService.getUsername()).subscribe(user => {

      this.id_filter = user.id;
      this.loadRecipes(this.id_filter);
      this.getWeeklySchedules();

    });
  }



  ngOnInit() {
    this.loadRecipes(this.id_filter);
    this.route.paramMap.subscribe(params => {
      this.id_weekly = +(params.get('id') || 0);
    });
    if (this.operation == 'EDIT') {
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

  getWeeklySchedules() {
    this.oWeeklyService.getOne(this.id_weekly).subscribe({
      next: (data: IWeekly) => {
        this.weekly = data;
        this.fetchSchedulesByWeeklyId(this.weekly.id);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

  }

  fetchSchedulesByWeeklyId(weeklyId: number) {
    this.oScheduleService.getArrayByWeekly(weeklyId).subscribe({
      next: (schedules: ISchedulePrueba[]) => {
        this.oSchedules = schedules;
        this.processSchedules(this.oSchedules);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });

  }

  processSchedules(schedules: ISchedulePrueba[]) {
    schedules.forEach(schedule => {
      const exists = this.oSchedules.some(existingSchedule => existingSchedule.id === schedule.id);
      // Si no existe, agregarlo
      if (!exists) {
        this.oSchedules.push(schedule);
      }
      this.setSelectedSchedule(schedule);
    });

  }

  loadRecipes(userId: number): void {
    this.oFavouriteService.getPageByUser(this.oPaginatorState.rows, this.oPaginatorState.page, userId).subscribe({
      next: (data: IIFavRecipePagePrueba) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.availableProducts = data.content.map(favRecipe => ({
          id: favRecipe.recipe.id,
          name: favRecipe.recipe.name,
          description: favRecipe.recipe.description,
          recipe_image: favRecipe.recipe.recipe_image,
          id_user: null,
          process: favRecipe.recipe.process,
          content: [],
          favs: [],
          schedules: [],
          isFavorite: false
        }));
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }


  getFav(): void {
    this.oFavouriteService.getOne(this.id_fav_filter).subscribe({
      next: (data: IFavRecipePrueba) => {
        this.oFavourite = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    })
  }

  setSelectedSchedule(schedule: ISchedulePrueba): void {

    if (schedule.type === 'Lunch') {
      switch (schedule.day) {
        case 'Monday':
          this.selectedMondayLunch = schedule.recipe;
          break;
        case 'Tuesday':
          this.selectedTuesdayLunch = schedule.recipe;
          break;
        case 'Wednesday':
          this.selectedWednesdayLunch = schedule.recipe;
          break;
        case 'Thursday':
          this.selectedThursdayLunch = schedule.recipe;
          break;
        case 'Friday':
          this.selectedFridayLunch = schedule.recipe;
          break;
        case 'Saturday':
          this.selectedSaturdayLunch = schedule.recipe;
          break;
        case 'Sunday':
          this.selectedSundayLunch = schedule.recipe;
          break;
        default:
          break;
      }
    } else {
      switch (schedule.day) {
        case 'Monday':
          this.selectedMondayDinner = schedule.recipe;
          break;
        case 'Tuesday':
          this.selectedTuesdayDinner = schedule.recipe;
          break;
        case 'Wednesday':
          this.selectedWednesdayDinner = schedule.recipe;
          break;
        case 'Thursday':
          this.selectedThursdayDinner = schedule.recipe;
          break;
        case 'Friday':
          this.selectedFridayDinner = schedule.recipe;
          break;
        case 'Saturday':
          this.selectedSaturdayDinner = schedule.recipe;
          break;
        case 'Sunday':
          this.selectedSundayDinner = schedule.recipe;
          break;
        default:
          break;
      }
    }
  }


  dragStart(product: IRecipe) {
    this.draggedProduct = product;
  }

  drop(id: number) {
    if (this.draggedProduct) {

      switch (id) {
        case 1:
          this.selectedMondayLunch = this.draggedProduct;
          break;
        case 2:
          this.selectedTuesdayLunch = this.draggedProduct;
          break;
        case 3:
          this.selectedWednesdayLunch = this.draggedProduct;
          break;
        case 4:
          this.selectedThursdayLunch = this.draggedProduct;
          break;
        case 5:
          this.selectedFridayLunch = this.draggedProduct;
          break;
        case 6:
          this.selectedSaturdayLunch = this.draggedProduct;
          break;
        case 7:
          this.selectedSundayLunch = this.draggedProduct;
          break;
        case 8:
          this.selectedMondayDinner = this.draggedProduct;
          break;
        case 9:
          this.selectedTuesdayDinner = this.draggedProduct;
          break;
        case 10:
          this.selectedWednesdayDinner = this.draggedProduct;
          break;
        case 11:
          this.selectedThursdayDinner = this.draggedProduct;
          break;
        case 12:
          this.selectedFridayDinner = this.draggedProduct;
          break;
        case 13:
          this.selectedSaturdayDinner = this.draggedProduct;
          break;
        case 14:
          this.selectedSundayDinner = this.draggedProduct;
          break;
        default:
          break;
      }
      this.draggedProduct = null;
    }
  }

  removeOne(id_recipe: number, type: string, day: string) {
    this.isExisting(this.id_weekly, id_recipe, type, day).then(isExisting => {
      if (isExisting) {
        this.oScheduleService.getOneByWeeklyAndRecipe(this.id_weekly, id_recipe, type, day).subscribe(data => {
          this.oScheduleService.removeOne(data.id).subscribe({
            next: () => { }
          });
        });

      }
    });
  }

  closePanel(id: number) {
    switch (id) {
      case 1:
        if (this.selectedMondayLunch) {
          this.removeOne(this.selectedMondayLunch?.id, 'Lunch', 'Monday');
        }
        this.selectedMondayLunch = null;
        break;
      case 2:
        if (this.selectedTuesdayLunch) {
          this.removeOne(this.selectedTuesdayLunch?.id, 'Lunch', 'Tuesday');
        }
        this.selectedTuesdayLunch = null;
        break;
      case 3:
        if (this.selectedWednesdayLunch) {
          this.removeOne(this.selectedWednesdayLunch?.id, 'Lunch', 'Wednesday');
        }
        this.selectedWednesdayLunch = null;
        break;
      case 4:
        if (this.selectedThursdayLunch) {
          this.removeOne(this.selectedThursdayLunch?.id, 'Lunch', 'Thursday');
        }
        this.selectedThursdayLunch = null;
        break;
      case 5:
        if (this.selectedFridayLunch) {
          this.removeOne(this.selectedFridayLunch?.id, 'Lunch', 'Friday');
        }
        this.selectedFridayLunch = null;
        break;
      case 6:
        if (this.selectedSaturdayLunch) {
          this.removeOne(this.selectedSaturdayLunch?.id, 'Lunch', 'Saturday');
        }
        this.selectedSaturdayLunch = null;
        break;
      case 7:
        if (this.selectedSundayLunch) {
          this.removeOne(this.selectedSundayLunch?.id, 'Lunch', 'Sunday');
        }
        this.selectedSundayLunch = null;
        break;
      case 8:
        if (this.selectedMondayDinner) {
          this.removeOne(this.selectedMondayDinner?.id, 'Dinner', 'Monday');
        }
        this.selectedMondayDinner = null;
        break;
      case 9:
        if (this.selectedTuesdayDinner) {
          this.removeOne(this.selectedTuesdayDinner?.id, 'Dinner', 'Tuesday');
        }
        this.selectedTuesdayDinner = null;
        break;
      case 10:
        if (this.selectedWednesdayDinner) {
          this.removeOne(this.selectedWednesdayDinner?.id, 'Dinner', 'Wednesday');
        }
        this.selectedWednesdayDinner = null;
        break;
      case 11:
        if (this.selectedThursdayDinner) {
          this.removeOne(this.selectedThursdayDinner?.id, 'Dinner', 'Thursday');
        }
        this.selectedThursdayDinner = null;
        break;
      case 12:
        if (this.selectedFridayDinner) {
          this.removeOne(this.selectedFridayDinner?.id, 'Dinner', 'Friday');
        }
        this.selectedFridayDinner = null;
        break;
      case 13:
        if (this.selectedSaturdayDinner) {
          this.removeOne(this.selectedSaturdayDinner?.id, 'Dinner', 'Saturday');
        }
        this.selectedSaturdayDinner = null;
        break;
      case 14:
        if (this.selectedSundayDinner) {
          this.removeOne(this.selectedSundayDinner?.id, 'Dinner', 'Sunday');
        }
        this.selectedSundayDinner = null;
        break;
      default:
        break;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  async isExisting(id_weekly: number, id_recipe: number, type: string, day: string): Promise<boolean> {
    if (id_recipe === undefined || id_recipe <= 0) {
      return false;
    } else {
      try {
        const data: ISchedulePrueba | undefined = await this.oScheduleService.getOneByWeeklyAndRecipe(id_weekly, id_recipe, type, day).toPromise();
        return !!data && !!data.id && data.id > 0;
      } catch (error) {
        return false;
      }
    }
  }


  onSubmit() {
    const scheduleList: any = {};
    this.oWeeklyService.getOne(this.id_weekly).subscribe((weekly: IWeekly) => {
      this.weekly = weekly;
      const dayMappings: any = {
        Monday: { lunch: this.selectedMondayLunch, dinner: this.selectedMondayDinner },
        Tuesday: { lunch: this.selectedTuesdayLunch, dinner: this.selectedTuesdayDinner },
        Wednesday: { lunch: this.selectedWednesdayLunch, dinner: this.selectedWednesdayDinner },
        Thursday: { lunch: this.selectedThursdayLunch, dinner: this.selectedThursdayDinner },
        Friday: { lunch: this.selectedFridayLunch, dinner: this.selectedFridayDinner },
        Saturday: { lunch: this.selectedSaturdayLunch, dinner: this.selectedSaturdayDinner },
        Sunday: { lunch: this.selectedSundayLunch, dinner: this.selectedSundayDinner }
      };
      for (const day in dayMappings) {

        if (Object.prototype.hasOwnProperty.call(dayMappings, day)) {
          // Obtener las recetas seleccionadas para el almuerzo y la cena de este día
          const { lunch, dinner } = dayMappings[day];


          if (lunch) {
            this.isExisting(this.id_weekly, lunch.id, 'Lunch', day).then(isExisting => {
              if (!isExisting) {
                const id_recipe: IRecipe = {
                  id: lunch.id,
                  id_user: null,
                  name: lunch.name,
                  description: lunch.description,
                  recipe_image: lunch.recipe_image,
                  process: lunch.process,
                  content: [],
                  favs: [],
                  schedules: [],
                };

                const weekly: IWeekly = {
                  id: this.id_weekly,
                  id_user: this.weekly.id_user,
                  init_date: this.weekly.init_date,
                  schedulesList: this.weekly.schedulesList,
                  //
                  schedules: [],
                }
                const schedule: ISchedule = {
                  id: 0,
                  id_recipe: id_recipe,
                  id_weekly: weekly,
                  type: 'Lunch',
                  day: day
                }


                this.oScheduleService.newOne(schedule).subscribe({
                  next: (data: ISchedule) => {
                    this.oSchedule = data;
                  },
                  error: (error: HttpErrorResponse) => {
                    this.status = error;
                  }
                });
              }
            });
          }

          if (dinner) {
            this.isExisting(this.id_weekly, dinner.id, 'Dinner', day).then(isExisting => {
              if (!isExisting) {
                const id_recipe: IRecipe = {
                  id: dinner.id,
                  id_user: null,
                  name: dinner.name,
                  description: dinner.description,
                  recipe_image: dinner.recipe_image,
                  process: dinner.process,
                  content: [],
                  favs: [],
                  schedules: [],
                };
                const schedule: ISchedule = {
                  id: 0,
                  id_recipe: id_recipe,
                  id_weekly: this.weekly,
                  type: 'Dinner',
                  day: day
                }


                this.oScheduleService.newOne(schedule).subscribe({
                  next: (data: ISchedule) => {
                    this.oSchedule = data;
                  },
                  error: (error: HttpErrorResponse) => {
                    this.status = error;
                  }
                });


              }
            });

          }

          // Agregar las recetas al objeto schedule
          scheduleList[day] = { lunch, dinner };

        }

      }
      this.oRouter.navigate(['/weekly/list/own']);

    });

  }


}
