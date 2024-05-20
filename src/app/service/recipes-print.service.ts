import { Injectable } from '@angular/core';
import { ISchedulePrueba } from '../model/model.interface';
import { ContentService } from './content.service';
import { forkJoin } from 'rxjs';
import jsPDF from 'jspdf'; 

@Injectable({
  providedIn: 'root'
})
export class RecipesPrintService {
  constructor(
    private oContentService: ContentService
  ) { }

  sp = (n: number): string => n.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  printSchedules = (oSchedulesToPrint: ISchedulePrueba[]): void => {
    var doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(12);
    doc = this.header(doc);
    forkJoin(
      oSchedulesToPrint.map(schedule =>
        forkJoin(
          schedule.recipe.content.map(content =>
            this.oContentService.getOneForPrinting(content.id)
          )
        )
      )
    ).subscribe(ingredientLists => {
      const allIngredients = ([] as any[]).concat(...ingredientLists);
      const uniqueIngredients = new Set<string>(Array.from(new Set(allIngredients.map(ingredient => ingredient.ingredient.name))));

      this.printIngredients(doc, uniqueIngredients, 40);
      this.prettyCircles(doc);


      doc.save('weekeat-grocery-list.pdf');
    });
  }

  setBaseColor(doc: any) {
    doc.setDrawColor(40, 83, 24);
    doc.setTextColor(40, 83, 24);
  }

  private header(doc: any): any {

    this.setBaseColor(doc);
    doc.setFont('Helvetica');
    doc.setFontSize(20);
    doc.text('My Grocery List', 70, 15);
    doc.line(10, 25, 200, 25);
    doc.setFont('Helvetica');

    return doc;
  }


  private printIngredients(doc: any, ingredients: Set<string>, footerSize: number): void {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yOffset = 40; // Inicializar la posición Y
    let xOffset = 20; // Inicializar la posición
    const lineHeight = 10; // Altura de la línea
    const pageHeight = 297; // Altura de la página (A4)

    ingredients.forEach(ingredient => {
      const remainingHeight = pageHeight - yOffset; // Altura restante en la página actual

      // Verificar si queda suficiente espacio en la página actual para imprimir este ingrediente
      if (remainingHeight < footerSize) {
        if (xOffset < 80) {
          xOffset = 80;
          yOffset = 40;
        } else {
          doc.addPage();
          xOffset = 20;
          yOffset = 40;
        }
      } else {
        doc = this.header(doc);
        doc = this.footer(doc);
      }

      doc.circle(xOffset - 3, yOffset - 1.5, 1.5, 'S')

      // Imprimir el ingrediente en la posición actual
      doc.text(xOffset, yOffset, ingredient);

      // Actualizar la posición Y para el próximo ingrediente
      yOffset += lineHeight;
    });
  }

  private prettyCircles(doc: any): void {

    doc.setFillColor(139, 187, 118);
    doc.circle(180, 50, 10, 'F');

    doc.setFillColor(119, 158, 102);
    doc.circle(208, 60, 16, 'F');

    doc.setFillColor(31, 73, 16);
    doc.circle(180, 100, 20, 'F');

    doc.setFillColor(119, 158, 102);
    doc.circle(210, 160, 45, 'F');
    
    doc.setFillColor(139, 187, 118);
    doc.circle(200, 230, 30, 'F');

  }

  private footer(doc: any): any {

    this.setBaseColor(doc);
    doc.line(10, 264, 200, 264);
    //
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(11, 274, `WeekEat`);
    doc.text(155, 274, `Don't think, just cook!`);
    doc.text(75, 284, `The easiest grocery list`);

    return doc;
  }
}
