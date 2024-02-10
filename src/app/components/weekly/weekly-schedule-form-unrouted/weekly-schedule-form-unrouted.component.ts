import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe, ISchedule, IWeekly } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { WeeklyService } from 'src/app/service/weekly.service';

@Component({
  selector: 'app-weekly-schedule-form-unrouted',
  templateUrl: './weekly-schedule-form-unrouted.component.html',
  styleUrls: ['./weekly-schedule-form-unrouted.component.css']
})
export class WeeklyScheduleFormUnroutedComponent implements OnInit {

  availableProducts: IRecipe[] = [];
  status: HttpErrorResponse | null = null;
  oSchedule: ISchedule = {id_weekly: {}, id_recipe: {}} as ISchedule;

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

  id_weekly: number = 0;

  weekly!: IWeekly;

  constructor(
    private oRecipeService: RecipeService,
    private oWeeklyService: WeeklyService,
    private oRouter: Router,
    private oScheduleService: ScheduleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadRecipes();
    this.route.paramMap.subscribe(params => {
      this.id_weekly = +(params.get('id') || 0);
    })
  }

  loadRecipes() {
    this.oRecipeService.getAllRecipes().subscribe({
      next: (response: any) => {
        // Verificar si la respuesta contiene una propiedad 'content' que es un array
        if (response && response.content && Array.isArray(response.content)) {
          // Asignar el array de recetas a availableProducts
          this.availableProducts = response.content;
        } else {
          console.error('La respuesta del servicio no contiene un array de recetas válido:', response);
        }
      },
      error: (error: any) => {
        console.error('Error al obtener las recetas:', error);
      }
    });
  }

  dragStart(product: IRecipe) {
    this.draggedProduct = product;
  }

  drop(id: number) {
    if (this.draggedProduct) {
      // this.selectedProducts.push(this.draggedProduct);
      //Lo siguiente simplemente elimina de la lista al arrastrar
      // this.availableProducts = this.availableProducts.filter(product => product.id !== this.draggedProduct!.id);
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
  closePanel(id: number) {
    // Aquí puedes establecer la lógica para cerrar el panel, por ejemplo, establecer selectedMondayLunch a null

    switch (id) {
      case 1:
        this.selectedMondayLunch = null;
        break;
      case 2:
        this.selectedTuesdayLunch = null;
        break;
      case 3:
        this.selectedWednesdayLunch = null;
        break;
      case 4:
        this.selectedThursdayLunch = null;
        break;
      case 5:
        this.selectedFridayLunch = null;
        break;
      case 6:
        this.selectedSaturdayLunch = null;
        break;
      case 7:
        this.selectedSundayLunch = null;
        break;
      case 8:
        this.selectedMondayDinner = null;
        break;
      case 9:
        this.selectedTuesdayDinner = null;
        break;
      case 10:
        this.selectedWednesdayDinner = null;
        break;
      case 11:
        this.selectedThursdayDinner = null;
        break;
      case 12:
        this.selectedFridayDinner = null;
        break;
      case 13:
        this.selectedSaturdayDinner = null;
        break;
      case 14:
        this.selectedSundayDinner = null;
        break;
      default:
        break;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
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
            const schedule: ISchedule = {
              id: 0,
              id_recipe: id_recipe,
              id_weekly: this.weekly,
              type: 'Lunch',
              day: day
            }
            console.log(schedule);

            this.oScheduleService.newOne(schedule).subscribe({
              next: (data: ISchedule) => {
                this.oSchedule = data;
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
              }
            });
          } 
          
          if(dinner) {
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
            console.log(schedule);

            this.oScheduleService.newOne(schedule).subscribe({
              next: (data: ISchedule) => {
                this.oSchedule = data;
              },
              error: (error: HttpErrorResponse) => {
                this.status = error;
              }
            });
          }
          
          // Agregar las recetas al objeto schedule
          scheduleList[day] = { lunch, dinner };

        }
      }
    
      this.oRouter.navigate(['/']);

    });

  }


}
