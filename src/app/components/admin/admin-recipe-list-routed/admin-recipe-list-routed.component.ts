import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-admin-recipe-list-routed',
  templateUrl: './admin-recipe-list-routed.component.html',
  styleUrls: ['./admin-recipe-list-routed.component.css']
})
export class AdminRecipeListRoutedComponent implements OnInit {
  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  constructor(
    private oConfirmationService: ConfirmationService,
    private oRecipeService: RecipeService
  ) { }

  ngOnInit() {
  }

}
