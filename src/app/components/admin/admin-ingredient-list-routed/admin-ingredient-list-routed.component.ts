import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-admin-ingredient-list-routed',
  templateUrl: './admin-ingredient-list-routed.component.html',
  styleUrls: ['./admin-ingredient-list-routed.component.css']
})
export class AdminIngredientListRoutedComponent implements OnInit {

  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  
  constructor(
    private oConfirmationService: ConfirmationService,
    private oIngredientService: IngredientService,
  ) { }

  ngOnInit() {
  }

}
