import { Injectable } from '@angular/core';
import { WeeklyService } from './weekly.service';
import { ScheduleService } from './schedule.service';
import { IWeekly } from '../model/model.interface';
declare let jsPDF: any;

@Injectable({
  providedIn: 'root'
})
export class WeeklyPrintService {

  constructor(
    private oWeeklyService: WeeklyService,
    private oScheduleService: ScheduleService,
  ) { }

  printWeekly = (id_weekly: number): void => {
    this.oWeeklyService.getOne(id_weekly).subscribe({
      next: (weekly: IWeekly) => {
        console.log("Probando a imprimir.");
        console.log('Weekly to print:', weekly);
        var doc = new jsPDF();
        doc.setFont('Arial');
        doc.setFontSize(12);
        doc = this.header(doc);
        //Contenido aqui
        doc = this.footer(doc);

        doc.save('weekeat-my-weekly.pdf');
      }
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
