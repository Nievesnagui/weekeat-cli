import { Injectable } from '@angular/core';
import { WeeklyService } from './weekly.service';
import { ScheduleService } from './schedule.service';
import { ISchedule, ISchedulePrueba, IWeekly } from '../model/model.interface';
import { ContentService } from './content.service';
import { forkJoin } from 'rxjs';
declare let jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class RecipesPrintService {

  constructor(
    private oWeeklyService: WeeklyService,
    private oScheduleService: ScheduleService,
    private oContentService: ContentService
  ) { }

  sp = (n: number): string => n.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  printSchedules = (oSchedulesToPrint: ISchedulePrueba[]): void => {
    var doc = new jsPDF();
    doc.setFont('Arial');
    doc.setFontSize(12);
    doc = this.header(doc);
    //doc = this.content(doc, oSchedulesToPrint); 
    forkJoin(
      oSchedulesToPrint.map(schedule => 
        forkJoin(
          schedule.recipe.content.map(content =>
            this.oContentService.getOneForPrinting(content.id)
          )
        )
      )
    ).subscribe(ingredientLists => {
      // ingredientLists es una matriz de matrices de ingredientes
      // Aplanar ingredientLists a una matriz plana de ingredientes
      const allIngredients = ([] as any[]).concat(...ingredientLists);
      const uniqueIngredients = new Set<string>(Array.from(new Set(allIngredients.map(ingredient => ingredient.ingredient.name))));

      this.printIngredients(doc, uniqueIngredients);
      doc = this.footer(doc);
  
      doc.save('weekeat-my-weekly.pdf');
    });
  }
  private header(doc: any): any {

    const indigoPastel = "#7887AB";

    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text('WEEKEAT 2024', 70, 25);
    //
    doc.setDrawColor(indigoPastel);
    doc.line(60, 30, 145, 30);
    //
    doc.text('My Weekly', 80, 40);
    doc.setDrawColor(indigoPastel);
    doc.line(10, 45, 200, 45);
    doc.setFontType('normal');

    return doc;
  }


  private printIngredients(doc: any, ingredients: Set<string>): void {
    doc.setFontSize(12);
    let yOffset = 50; // Inicializar la posición Y
    const lineHeight = 10; // Altura de la línea
    const pageHeight = 297; // Altura de la página (A4)
  
    ingredients.forEach(ingredient => {
      const requiredHeight = lineHeight; // Altura requerida para este ingrediente
      const remainingHeight = pageHeight - yOffset; // Altura restante en la página actual
  
      // Verificar si queda suficiente espacio en la página actual para imprimir este ingrediente
      if (remainingHeight < requiredHeight) {
        doc.addPage(); // Agregar una nueva página
        yOffset = 50; // Restablecer la posición Y en la nueva página
      }
  
      // Imprimir el ingrediente en la posición actual
      doc.text(20, yOffset, ingredient);
  
      // Actualizar la posición Y para el próximo ingrediente
      yOffset += lineHeight;
    });
  }
  
  
  private linea(doc: any, oSchedule: ISchedulePrueba, linea: number): void {
    doc.setFontSize(12);
    const lineHeight = 7; // Altura de línea
    const pageHeight = 297; // Altura de página (A4)
    
    // Calcular la altura restante en la página actual
    const remainingHeight = pageHeight - linea;
    
    // Calcular la altura necesaria para imprimir esta línea
    const requiredHeight = lineHeight * 3; // Asumiendo una altura de 3 líneas
    
    // Verificar si queda suficiente espacio en la página actual
    if (remainingHeight < requiredHeight) {
      doc.addPage(); // Agregar una nueva página
      doc = this.header(doc); // Agregar el encabezado a la nueva página
      linea = 50; // Restablecer la posición de la línea en la nueva página
    }
    
    // Imprimir el nombre de la receta y el proceso en la posición actual
    doc.text(oSchedule.recipe.name, 20, linea);
    doc.setFontSize(8);
    doc.text(oSchedule.recipe.process, 210, linea, 'center');
  
    // Actualizar la posición de la línea para la próxima iteración
    linea += requiredHeight;
  }
  

  private footer(doc: any): any {

    const indigoPastel = "#7887AB";

    doc.setDrawColor(indigoPastel);
    doc.line(10, 244, 200, 244);
    //
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(11, 254, `CIPFP Ausiàs March`);
    doc.text(11, 264, `Télf: 961205930`);
    doc.text(65, 264, `Fax: 961205931`);
    doc.text(11, 274, `C/Ángel Villena, s/n. 46013 Valencia`);
    doc.text(11, 284, `secretaria@ausiasmarch.net`);

    return doc;
  }
}
