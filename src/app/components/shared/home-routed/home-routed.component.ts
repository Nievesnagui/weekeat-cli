import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { IRecipe, IRecipePage, ISchedulePrueba, IUser, IWeekly } from 'src/app/model/model.interface';
import { RecipeService } from 'src/app/service/recipe.service';
import { RecipesPrintService } from 'src/app/service/recipes-print.service';
import { ScheduleService } from 'src/app/service/schedule.service';
import { SessionService } from 'src/app/service/session.service';
import { UserService } from 'src/app/service/user.service';
import { WeeklyService } from 'src/app/service/weekly.service';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  @ViewChild('tableToPrint') tableToPrint!: ElementRef;

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
    private oRecipesPrinterService: RecipesPrintService,

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

  printRecipes() {

    this.oRecipesPrinterService.printSchedules(this.oSchedules);

  }

  printTable() {
  let newWindow: Window | null = null;

  const table = this.tableToPrint.nativeElement.cloneNode(true);
  const elementsToHide = table.querySelectorAll('.to-ignore');
  elementsToHide.forEach((element: HTMLElement) => {
    element.style.display = 'none';
  });

  newWindow = window.open('', '_blank', 'height=600,width=800,title=Weekly');
  if (newWindow) {
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly</title>
        <style>
          .body{
          }
           .table {
              position: absolute;
              top: 50%;
              margin-top: -300px;
             border-collapse: collapse;
             width: 100%;
           }
           
          /* Estilos para las celdas de encabezado */
           .table th {
            border: 1px solid #ddd;
            text-align: left;
            background-color:#8BBB76;
          }
  
            /* Estilos para las celdas de datos */
            .table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
  
            /* Estilos para la clase .fixed-cell */
            .fixed-cell {
              width: 15%; /* Ancho fijo para las celdas de la tabla */
            }
  
            /* Estilos para centrar el texto */
            .has-text-centered {
              text-align: center;
            }
  
           /* Estilos para centrar verticalmente */
         .is-vcentered {
           vertical-align: middle;
          }
  
            /* Estilos para la clase .card */
            .card {
              border: 1px solid #ddd;
              border-radius: 4px;
              padding: 8px;
            }
  
           /* Estilos para el título dentro del panel */
           .p-panel__title {
             font-weight: bold;
           }
  
           /* Estilos para la imagen dentro del panel */
           .p-panel__content img {
           max-width: 100%;
           height: auto;
          }
  
          .product-item-content h6 {
           position: absolute;
           border-radius: 0.313em;
           background-color: #455a3c70;
           bottom: 7em;
           left: 0.625em;
           color: white;
           padding: 0.313em;
           z-index: 1;
           backdrop-filter: blur(0.313em);
           -webkit-backdrop-filter: blur(0.313em);
           clip-path: inset(0);
          }
  
          .product-item-content a {
            bottom: 8.625em;
            left: 3.625em;
            position: absolute;
            z-index: 2;
            color: white;
            text-decoration: none;
            font-size: 0.875em;
          }
  
          .product-item-content h4 {
            position: absolute;
            background-color: #455a3c70;
            left: 0.625em;
            color: #EFF0EB;
            padding: 0.313em;
            z-index: 1;
            border-radius: 0.313em;
            backdrop-filter: blur(0.313em);
            -webkit-backdrop-filter: blur(0.313em);
            clip-path: inset(0);
          }
  
          .product-item-content-picture {
            height: 3.75em;
          }
  
          img {
            border-radius: 0.4em;
            width: 100px;
            height: 100px;
          }
          @page {
            size: auto;   /* Tamaño de página automático */
            margin: 0mm;  /* Margen cero */
          }
        </style>
      </head>
      <body>
        <div id="print-content">
          ${table.outerHTML} <!-- Insertamos el contenido de la tabla -->
        </div>
      </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  } else {
    console.error('No se pudo abrir la nueva ventana.');
  }
}

  
}
