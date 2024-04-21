import { Injectable } from '@angular/core';
import { WeeklyService } from './weekly.service';
import { ScheduleService } from './schedule.service';
import { ISchedule, ISchedulePrueba, IWeekly } from '../model/model.interface';
declare let jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class WeeklyPrintService {

  constructor(
    private oWeeklyService: WeeklyService,
    private oScheduleService: ScheduleService,
  ) { }

  printWeekly = (id_weekly: number, oSchedulesToPrint: ISchedulePrueba[]): void => {
    var doc = new jsPDF('landscape');
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
    doc.text(baseX, baseY, 'Day', { align: 'center' });
  
    // Dibujar los días de la semana
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let currentX = baseX + cellWidth;
    for (let i = 0; i < days.length; i++) {
      doc.text(currentX, baseY, days[i], { align: 'center' });
      doc.setDrawColor(indigoPastel);
      doc.rect(currentX - cellWidth / 2, baseY + 5, cellWidth, cellHeight);
      currentX += cellWidth;
    }
  
    // Dibujar el contenido de la tabla
    const mealTypes = ['Lunch', 'Dinner'];
    let currentY = baseY + cellHeight;
    for (let i = 0; i < mealTypes.length; i++) {
      doc.text(baseX, currentY, mealTypes[i], { align: 'center' });
      currentX = baseX + cellWidth;
      for (let j = 0; j < days.length; j++) {
        const schedule = oSchedulesToPrint.find(schedule => schedule.day === days[j] && schedule.type === mealTypes[i]);
        if (schedule) {
          doc.text(currentX, currentY, schedule.recipe.name, { align: 'center' });
        }
        currentX += cellWidth;
      }
      currentY += cellHeight;
    }
  
    return doc;
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
