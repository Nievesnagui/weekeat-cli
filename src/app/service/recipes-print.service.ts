import { Injectable } from '@angular/core';
import { WeeklyService } from './weekly.service';
import { ScheduleService } from './schedule.service';
import { ISchedule, ISchedulePrueba, IWeekly } from '../model/model.interface';
declare let jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class RecipesPrintService {

  constructor(
    private oWeeklyService: WeeklyService,
    private oScheduleService: ScheduleService,
  ) { }

  sp = (n: number): string => n.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  printSchedules = (oSchedulesToPrint: ISchedulePrueba[]): void => {
    var doc = new jsPDF();
    doc.setFont('Arial');
    doc.setFontSize(12);
    doc = this.header(doc);
    doc = this.content(doc, oSchedulesToPrint); // Pasar los horarios a la función content
    doc = this.footer(doc);
  
    doc.save('weekeat-my-weekly.pdf');
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

  private content(doc:any, oSchedulesToPrint: ISchedulePrueba[]): any {
    const baseX = 10;
    const baseY = 50;
    const cellWidth = 60; // Aumenta el ancho de la celda
    const cellHeight = 30; // Aumenta la altura de la celda
    const indigoPastel = "#7887AB";
  
    doc.setFontType('bold');
    doc.setFontSize(14);
    doc.text(baseX, baseY, '?', { align: 'center' });
    var linea = 55;
    var printedRecipeIds: number[] = [];
  
    for (let i = 0; i < oSchedulesToPrint.length; i++) {
      const currentSchedule = oSchedulesToPrint[i];
      // Verificar si el ID de la receta ya se ha impreso
      if (!printedRecipeIds.includes(currentSchedule.recipe.id)) {
        printedRecipeIds.push(currentSchedule.recipe.id); // Agregar el ID de la receta al array de IDs impresos
        this.lineaFactura(doc, currentSchedule, linea);
        linea = linea + 7;
        if (i>0 && i<oSchedulesToPrint.length) {
          doc.addPage();
          doc = this.header(doc);
          linea = 155;
          doc.setFontSize(12)
        }
    }
    }
  
    return doc;
  }
  
  private lineaFactura(doc: any, oSchedule: ISchedulePrueba, linea: number): void {
    doc.setFontSize(12)
    doc.text(oSchedule.recipe.name, 20, linea)
    doc.setFontSize(8);
    linea=10;
    doc.text(oSchedule.recipe.process, 210, linea, 'center' );
    // doc.text(oSchedule.recipe.description, 160, linea, 'right');
    // doc.text(oSchedule.recipe.process, 194, linea, 'right');
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
